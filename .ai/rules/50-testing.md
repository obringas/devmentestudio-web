# 50 — Testing y validación

> Se carga cuando la tarea implica escribir o ejecutar tests, o al validar cualquier implementación (siempre antes de entregar).
> Comandos concretos del proyecto: `docs/03-setup.md`.

---

## 1. Principio

**No afirmes lo que no verificaste.** "Debería funcionar" no es un resultado. Si una validación no pudo ejecutarse, la entrega lo dice explícitamente: qué, por qué, y qué riesgo deja abierto.

---

## 2. Cómo ejecutar: siempre a través de `run-quiet`

**Nunca corras `dotnet build`, `dotnet test`, `ng build`, `npm test`, `eslint` ni ningún comando ruidoso en forma directa.** Su salida completa (una suite en verde son decenas de miles de tokens) entra en tu contexto y lo degrada por el resto de la sesión. Usá el envoltorio del protocolo:

```text
node .ai/tools/run-quiet.js -- dotnet test
node .ai/tools/run-quiet.js -- dotnet build -c Release
node .ai/tools/run-quiet.js -- npx ng build --configuration production
node .ai/tools/run-quiet.js -- npm test -- --watch=false
node .ai/tools/run-quiet.js -- npx eslint src
```

Devuelve una línea de resultado (OK/FAILED, conteos, duración) y, si falló, solo los errores con archivo y línea. La salida completa queda en un log en el directorio temporal del sistema (la ruta viene en la primera línea); **abrilo solo si el resumen no alcanza para decidir**, y leé la parte que necesitás, no el archivo entero. Huella externa: invocalo desde el sidecar (`node <SIDECAR>\.ai\tools\run-quiet.js -- …`), el log nunca cae dentro del repo.

## 3. Orden de validación (del cambio hacia afuera)

Validá primero lo más cercano al cambio y ampliá según el riesgo:

| Paso | Backend .NET | Frontend Angular |
|---|---|---|
| 1. Estático | `dotnet format --verify-no-changes`, analizadores, build del proyecto afectado | `lint`, `tsc --noEmit` / type-check, Prettier |
| 2. Unitario | Tests de dominio, servicios de aplicación, validaciones, mappers | Tests de servicios, pipes, validadores, transformaciones puras, stores |
| 3. Componente / integración | Tests de API (`WebApplicationFactory`), persistencia (DB en contenedor o LocalDB), auth | Tests de componentes: render, interacción, estados, accesibilidad básica |
| 4. Sistema | Build de la solución completa si el cambio cruza proyectos; migraciones aplicadas en limpio | Build de producción si tocó rutas, config, dependencias o lazy loading |
| 5. End-to-end | Flujos críticos si el proyecto los tiene | Cypress/Playwright en flujos críticos si existen |
| 6. Manual | Contrato HTTP (Swagger/REST client), flujo crítico | Revisión visual: responsive, estados, teclado, textos largos |

Un cambio pequeño y aislado puede detenerse en el paso 2 o 3. Un cambio en contratos, datos, seguridad o rutas llega al 4 como mínimo.

---

## 4. Qué testear (y qué no)

**Sí:**

- Reglas de negocio: casos normales, límites, errores esperados.
- Validaciones: entradas inválidas, nulas, vacías, fuera de rango, duplicadas.
- Transformaciones y mapeos: DTO ↔ dominio, cálculos, redondeos, fechas.
- Comportamiento observable de componentes: qué se muestra en cada estado, qué emite ante cada interacción.
- Regresiones: cada bug corregido deja un test que lo reproduce.
- Contratos: forma de la respuesta HTTP, códigos de estado, errores.

**No:**

- Tests que replican la implementación línea por línea (se rompen con cada refactor sin detectar bugs).
- Getters/setters triviales, constructores sin lógica, código generado.
- Detalles internos privados: se testean a través del comportamiento público.
- Mocks de todo lo que se mueve: si para testear una clase mockeás cinco dependencias, el diseño tiene un problema; anotalo.

---

## 5. Estructura y nombres

- **AAA**: Arrange · Act · Assert, separados visualmente. Un `Act` por test.
- Nombre que describe escenario y resultado: `Metodo_Escenario_ResultadoEsperado` (.NET) o `describe('Metodo') / it('deberia <resultado> cuando <escenario>')` (TS). Siguiendo la convención del repo.

```csharp
[Fact]
public void CalcularRetencion_MontoBajoMinimo_DevuelveCero()
```

```ts
describe('SaldoService', () => {
  it('deberia devolver cero cuando no hay movimientos', () => { … });
});
```

- Un test verifica **una** cosa. Varios asserts están bien si describen el mismo resultado.
- Datos de prueba con intención: `clienteConDeudaVencida`, no `cliente1`. Builders/factories para objetos complejos; sin fixtures gigantes compartidas que nadie entiende.
- Tests independientes del orden y del reloj (`TimeProvider`/`IClock` inyectable; fechas fijas, nunca `DateTime.Now`/`new Date()` sin control).
- Sin lógica condicional dentro del test. Sin `sleep`/`setTimeout` para esperar.
- Tests deterministas: si falla a veces, es un bug del test o del código, no "flaky aceptable".

---

## 6. Por stack

### .NET

- Framework y librerías **las del repo** (xUnit/NUnit/MSTest; Moq/NSubstitute; FluentAssertions si está). No agregar otra.
- Tests de integración con `WebApplicationFactory<Program>`; base de datos real en contenedor o LocalDB para persistencia; nunca contra ambientes compartidos.
- Tests de SQL/SP: ejecutar contra base de prueba con datos semilla controlados, dentro de transacción con rollback al final.
- Cobertura como señal, no objetivo. Prioridad: dominio y reglas de negocio al 100 % de ramas relevantes.

### Angular

- Framework **el del repo** (Jasmine/Karma, Jest o Vitest). No migrar en un cambio funcional.
- Tests de componentes con `TestBed` o Testing Library; consultar por rol/texto accesible antes que por clases CSS o IDs internos.
- Servicios HTTP con `HttpTestingController`; verificar URL, método, body y manejo de error.
- Signals: testear valores `computed` y transiciones; RxJS: `TestScheduler`/marbles para lógica temporal compleja.
- No testear el framework (que `*ngIf` oculta, que el binding funciona).

---

## 7. Validación manual mínima

Cuando no hay tests automatizados que cubran el cambio, o además de ellos cuando hay UI/datos:

- Backend: llamada real al endpoint con caso válido, inválido y sin permiso; verificar respuesta y estado en base de datos (incluyendo columnas de auditoría).
- Datos: `SELECT` de verificación antes y después; conteo de filas afectadas igual al esperado.
- Frontend: flujo completo en el navegador; estados carga/error/vacío; teclado; ancho móvil; textos largos.

Registrá qué se verificó manualmente y con qué datos en la entrega.

---

## 8. Cuando no se puede validar

Casos típicos: sin acceso a base, sin runtime, sin credenciales, dependencias externas no disponibles.

1. Decilo en la entrega, en "Validaciones realizadas", con el motivo exacto.
2. Hacé todo lo que sí se pueda (build, type-check, tests unitarios sin infraestructura).
3. Dejá en "Cómo probar" los pasos para que un humano complete la validación.
4. Registrá en `docs/09-working-state.md` que la validación está pendiente.

Nunca marques una tarea como terminada presentando como verificado lo que no lo fue.

---

## 9. Checklist

- [ ] Todo build/test/lint ejecutado vía `run-quiet.js`; ningún log completo en el contexto.
- [ ] Estático en verde (format/lint/analizadores/type-check).
- [ ] Tests unitarios del área afectada escritos y ejecutados.
- [ ] Cada bug corregido tiene su test de regresión.
- [ ] Tests nombrados por escenario/resultado, AAA, deterministas.
- [ ] Integración/build completo si el cambio cruza fronteras.
- [ ] Validación manual registrada con datos y resultado.
- [ ] Lo no validado está declarado con motivo y pasos para completarlo.
