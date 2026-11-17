# 30 — Frontend Angular / TypeScript

> Se carga cuando la tarea toca componentes, pantallas, servicios frontend, estado, formularios, estilos o UX.
> Seguridad transversal en `60-security.md`; testing en `50-testing.md`.

---

## 1. Primer contacto: qué inspeccionar

Si existen:

- `package.json` + lockfile (gestor real: npm/pnpm/yarn; versiones de Angular, TypeScript, Node; scripts).
- `angular.json` / `project.json` / `nx.json`: proyectos, builders, configuraciones de entorno, budgets.
- `tsconfig*.json` (¿`strict`?), ESLint, Prettier, `.editorconfig`.
- Bootstrap (`main.ts`, `app.config.ts` o `AppModule`), rutas, guards, interceptors, providers.
- Organización: `core/`, `shared/`, `features/` (o la que exista). Standalone vs. NgModules. Signals vs. RxJS vs. NgRx/otro store.
- Capa de acceso a API: servicios, clientes generados (OpenAPI), modelos/DTOs.
- Design system, librería UI (Material, PrimeNG, Tailwind…), tokens, temas, i18n.
- Tests: Jasmine/Karma, Jest, Vitest; e2e (Cypress, Playwright).
- Pipelines, Dockerfile, `environment*.ts` (solo nombres de claves).

Registrá lo detectado en `docs/02-architecture.md` y `docs/00-repo-map.md`. Marcá inferencias como `[INFERIDO: validar]`.

---

## 2. Arquitectura y organización

- Respetá la versión de Angular y el modelo **detectado** (standalone/NgModules, Signals/RxJS, store). No migres por oportunidad; si conviene, proponé un ADR.
- Estructura de referencia (adaptar a la real):

```text
src/app/
├── core/            singletons: auth, interceptors, guards, configuración, layout raíz
├── shared/          componentes, pipes, directivas y utilidades REUTILIZADAS por ≥2 features (no un depósito)
├── features/
│   └── <feature>/
│       ├── pages/        componentes de ruta (smart): orquestan, no presentan
│       ├── components/   componentes de presentación (dumb): inputs/outputs, sin servicios de datos
│       ├── services/     fachada/estado de la feature
│       ├── data/         cliente HTTP de la feature, DTOs, mappers DTO → modelo
│       ├── models/       tipos del dominio de la feature
│       └── <feature>.routes.ts
└── app.routes.ts · app.config.ts
```

- **Regla de capas, sin excepciones:** `componente → servicio de feature / fachada → cliente HTTP → API`. **Ningún componente inyecta `HttpClient` ni conoce URLs.** Ningún componente llama a un endpoint directamente.
- Componentes **smart** (de ruta) orquestan datos y estado; componentes **dumb** reciben `@Input`/`input()` y emiten `@Output`/`output()`. Un componente dumb no inyecta servicios de datos.
- Un componente no supera un nivel de abstracción: si mezcla llamadas HTTP, transformación de datos y template complejo, hay que dividir.
- `shared/` solo contiene piezas usadas por dos o más features y sin conocimiento de dominio específico. Lo que usa una sola feature vive en esa feature.
- Lazy loading por feature. Rutas con `loadChildren`/`loadComponent`.

---

## 3. TypeScript

- `strict: true` (si el repo no lo tiene, registrar como deuda, no activarlo en un cambio no relacionado).
- Sin `any`. En fronteras externas (HTTP, storage, `JSON.parse`) partí de `unknown` y validá/mapeá.
- Modelos de dominio ≠ DTOs de API. Mapear en `data/`; el resto de la app no conoce la forma del JSON.
- Si existe generación tipada de contratos (OpenAPI), usala. No dupliques tipos a mano.
- `readonly` y tipos inmutables para inputs y estado expuesto. Sin mutar objetos recibidos por input.
- Enums de string o union types para estados; nunca strings sueltos repetidos en el código.
- Funciones puras para transformaciones; testeables sin Angular.

---

## 4. Estado, Signals y RxJS

- Respetá el mecanismo de estado ya adoptado.
- **Signals** para estado local sincrónico y valores derivados (`computed`). **RxJS** para flujos asíncronos, eventos y composición temporal (`debounce`, `switchMap`, cancelación).
- Una sola fuente de verdad por dato: no el mismo valor en un Signal, un Observable y una propiedad.
- Sin suscripciones manuales cuando `async` pipe, `toSignal` o un patrón declarativo existente lo resuelve. Si hace falta `subscribe`, limpieza garantizada (`takeUntilDestroyed`, `DestroyRef`).
- Sin `effect()` para propagar estado que puede ser `computed`. Efectos solo para sincronizar con el mundo exterior (storage, DOM, logging).
- Operadores por semántica real: `switchMap` para búsquedas (cancela la anterior), `exhaustMap` para submits (ignora clics repetidos), `concatMap` para secuencias ordenadas, `mergeMap` solo cuando el orden no importa.
- Estado de feature en un servicio/fachada de la feature; estado global solo para lo verdaderamente global (sesión, permisos, configuración).

---

## 5. HTTP, contratos y errores

- Acceso HTTP centralizado en clientes por feature o un API client. URLs base desde configuración (`environment`/`APP_INITIALIZER`), nunca hardcodeadas.
- Requests y responses tipados. Datos externos tratados como no confiables (validación en el mapper si el riesgo lo amerita).
- Interceptors para preocupaciones transversales (auth header, correlation id, manejo genérico de errores, loading). Nunca para reglas de negocio.
- Errores clasificados y representados distinto: validación (400) · sesión/permiso (401/403) · no encontrado (404) · conflicto de negocio (409) · conectividad · inesperado. Mensajes comprensibles; nunca stack traces ni mensajes técnicos del backend al usuario.
- Evitar solicitudes duplicadas, carreras y estados obsoletos (`switchMap`, deshabilitar botón durante submit, `shareReplay` donde corresponde).
- Compatibilidad con el contrato de API: si cambia, coordinar con backend y documentar en `02-architecture.md`.

---

## 6. Formularios

- Formularios **reactivos tipados** para todo flujo no trivial (salvo convención contraria documentada).
- Validaciones coherentes con el backend. El cliente **nunca** es frontera de seguridad; valida para UX.
- Errores mostrados en el momento adecuado (al tocar/salir del control o al intentar enviar), asociados al control (`aria-describedby`).
- Sin envíos de formularios inválidos ni envíos múltiples durante una operación en curso.
- Preservar datos del usuario ante errores recuperables. Confirmar antes de descartar cambios no guardados.
- Lógica de validación compleja en validadores reutilizables, no en el componente.

---

## 7. UI/UX y accesibilidad

> Los criterios de diseño visual (identidad, tokens, tipografía, patrones por pantalla, anti-genérico) están en `31-ui-design.md`. Acá solo lo estructural.

- Reutilizar el design system, componentes y tokens existentes antes de crear variantes. Sin estilos inline ni colores/espaciados hardcodeados si hay tokens.
- Toda vista con datos remotos contempla **carga · error (con reintento) · vacío · éxito**. Sin pantallas que quedan en blanco.
- Acciones destructivas con confirmación que explique consecuencias.
- HTML semántico: botones son `<button>`, enlaces son `<a>`, listas son `<ul>/<ol>`. Sin `div` clicables sin rol, tabindex y manejo de teclado completo.
- Labels asociados a cada control; nombres accesibles en iconos-botón (`aria-label`); foco visible; orden de tabulación lógico; foco administrado en diálogos y cambios de contexto.
- Contraste y tamaño táctil según el design system. Verificar responsive, zoom 200 %, textos largos, datos vacíos y estados deshabilitados.
- No entregar interfaz "cruda": jerarquía visual, espaciado y alineación consistentes con el producto.

---

## 8. Performance

- `ChangeDetectionStrategy.OnPush` en componentes nuevos (si el repo lo usa o lo permite).
- `track` estable en `@for` / `trackBy` en `*ngFor`.
- Sin llamadas a funciones costosas ni creación de objetos en templates; usar `computed`/pipes puros.
- Lazy loading de features y de librerías pesadas. Respetar budgets de `angular.json`.
- Imágenes con `NgOptimizedImage` cuando aplique. Sin librerías nuevas por una utilidad que el navegador o Angular ya traen.
- Medir (DevTools, Lighthouse, `ng build --stats-json`) antes de optimizar.

---

## 9. Convenciones Angular/TypeScript

- Nombres de archivo `kebab-case` con sufijo de tipo según el repo (`cliente-lista.component.ts`, o la convención de la versión de Angular en uso).
- Selectores con prefijo del proyecto (`app-`, o el configurado).
- Un componente por archivo; template y estilos separados cuando superan ~20 líneas.
- Orden en clases: inputs/outputs → inyecciones → estado → ciclo de vida → handlers públicos → privados.
- `inject()` o constructor según la convención del repo; no mezclar en un mismo módulo.
- ESLint/Prettier del repo sin excepciones nuevas sin justificar.

---

## 10. Checklist específico Angular

- [ ] Ningún componente inyecta `HttpClient` ni conoce URLs; la cadena componente → servicio → cliente HTTP se respeta.
- [ ] Componentes dumb sin servicios de datos; smart solo orquestan.
- [ ] Sin `any`; DTOs mapeados a modelos en `data/`.
- [ ] Sin suscripciones sin limpieza; operadores RxJS con la semántica correcta.
- [ ] Estados carga/error/vacío/éxito contemplados.
- [ ] Formularios tipados; sin doble submit; errores asociados al control.
- [ ] HTML semántico; teclado y foco funcionan; labels y `aria-*` presentes.
- [ ] Lo nuevo en `shared/` lo usan ≥2 features.
- [ ] Lint + type-check + tests del área ejecutados; build de producción si tocó rutas, config o dependencias.
