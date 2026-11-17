# 10 — Código limpio, modular y reutilizable

> Se carga **siempre** que la tarea toque código. Son criterios **observables**: cada regla dice qué mirar y qué hacer.
> Las reglas específicas de C#/.NET y TypeScript/Angular están en los archivos de stack; acá va lo que aplica a cualquier lenguaje.

---

## 1. Principios rectores

| Principio | En la práctica significa |
|---|---|
| **SRP** (una responsabilidad) | Cada clase, función o módulo tiene un solo motivo para cambiar. Si para describirla necesitás "y", dividila. |
| **OCP** | Extender comportamiento agregando piezas, no editando las existentes. Pero no crees puntos de extensión que nadie pidió. |
| **LSP** | Un subtipo nunca rompe lo que el tipo base prometía (sin `throw NotImplemented`, sin precondiciones más duras). |
| **ISP** | Interfaces pequeñas y específicas. Nadie implementa métodos que no usa. |
| **DIP** | Las capas de alto nivel dependen de abstracciones, no de detalles. La dirección de dependencia va hacia el dominio. |
| **DRY** | No duplicar **conocimiento** (reglas, cálculos, validaciones). Dos textos iguales con significados distintos no son duplicación. |
| **KISS** | La solución más simple que resuelve el problema real. Complejidad solo con evidencia de que hace falta. |
| **YAGNI** | No construir para un futuro hipotético. Parámetros, flags, capas y abstracciones solo con un caso de uso presente. |

SOLID se aplica **cuando aporta valor**. Una interfaz por cada clase "porque sí" viola KISS y YAGNI.

---

## 2. Nombres

- Un nombre revela **intención**: qué es, qué hace, para qué. `clientesActivos`, no `lista2`; `CalcularSaldoPendiente()`, no `Proc()`.
- Sin abreviaturas crípticas ni sufijos de tipo (`strNombre`, `lstItems`). Excepciones: convenciones consolidadas del repo (`dto`, `id`, `url`).
- Booleanos como predicados: `estaVencido`, `tienePermiso`, `puedeFacturar`.
- Funciones con verbo; clases y tipos con sustantivo; colecciones en plural.
- Respetá el idioma que ya usa el repositorio (español o inglés). No mezcles dentro de un mismo módulo.
- Un concepto, un nombre: no llames `cliente`, `customer` y `comprador` a lo mismo.
- Magic numbers y strings → constantes o enums con nombre (`DiasDeGracia = 30`, no `30`).

---

## 3. Funciones y métodos

- Hacen **una** cosa, en un solo nivel de abstracción. Si tiene secciones comentadas (`// validar`, `// calcular`, `// guardar`), son tres funciones.
- Tamaño como **señal**, no como ley: más de ~30 líneas o más de 3 niveles de indentación → revisar responsabilidades.
- Máximo 3-4 parámetros. Más → agrupar en un objeto con nombre. Sin parámetros booleanos que cambian el comportamiento (`Guardar(dto, true)`): dos funciones o una estrategia.
- Sin efectos secundarios ocultos: una función que se llama `Obtener…` no escribe nada.
- **Guard clauses** al principio en lugar de `if` anidados. Salí temprano.
- Sin `null` como "no hay resultado" cuando hay una mejor alternativa (colección vacía, `Option`/`Result`, excepción específica), según la convención del repo.

---

## 4. Clases, módulos y fronteras

- Cohesión alta: los miembros de una clase trabajan sobre los mismos datos. Si un grupo de métodos usa un subconjunto de campos, es otra clase.
- Tamaño como señal: más de ~300 líneas → revisar. Más de 500 → justificar por escrito.
- **Fronteras explícitas entre capas**: transporte (HTTP, UI) · aplicación/negocio · dominio · datos/infraestructura · configuración. Una pieza no cruza dos fronteras.
- Dependencias **hacia adentro**: UI y datos dependen del negocio, nunca al revés.
- Las carpetas `shared`, `common`, `utils`, `helpers` no son depósitos. Cada cosa ahí tiene una responsabilidad nombrable; si no, va al módulo que la usa.
- Preferí composición sobre herencia. Herencia solo para relaciones "es-un" reales y estables.
- Inmutabilidad por defecto para valores, contratos y configuración. Estado mutable solo donde el dominio lo exige, y encapsulado.

---

## 5. Reutilización: buscá antes de crear

Procedimiento obligatorio antes de crear una pieza nueva:

1. Buscá por **nombre** y sinónimos en todo el repo.
2. Buscá por **responsabilidad** en `shared`/`common`/`core`/`infrastructure`/`utils` y en el módulo vecino.
3. Si existe algo que resuelve el 80 %, **extendelo** o parametrizalo; no cloná.
4. Si existe pero está mal diseñado: usalo igual dentro del alcance y registrá la deuda en `08-known-issues.md`. No lo reescribas sin autorización.
5. Si no existe, crealo en el lugar que corresponde por responsabilidad, no en el lugar más cómodo.

**Regla de tres:** la primera vez escribís; la segunda, tolerás la duplicación anotando el riesgo; la tercera, extraés. No abstraigas con un solo uso.

Una pieza es reutilizable cuando: no depende de contexto que no recibe por parámetros, no conoce quién la llama, tiene un contrato claro y está testeada sola.

---

## 6. Condicionales y flujo

- Sin anidación profunda: guard clauses, extracción a funciones, tablas de decisión o polimorfismo.
- `switch`/`if` sobre un tipo repetido en varios lugares → candidato a polimorfismo o estrategia.
- Sin condiciones negativas dobles (`if (!noEsValido)`).
- Expresiones booleanas complejas → variable o función con nombre (`var puedeAnular = …`).
- Sin excepciones como control de flujo.

---

## 7. Errores

- **Fail fast**: validá en el límite (entrada HTTP, formulario, archivo) y asumí datos válidos adentro.
- Excepciones específicas con mensaje accionable. Nunca `catch` vacío, nunca `catch (Exception) { }` genérico que traga todo.
- No capturar para relanzar sin agregar contexto. Si no podés hacer nada útil con el error, no lo captures.
- Loguear una vez, en el lugar que tiene contexto. No loguear y relanzar en cada capa.
- El usuario final ve un mensaje comprensible; el log ve el detalle técnico. Nunca al revés.
- Separar errores esperables (validación, negocio, no encontrado, sin permiso) de inesperados (bug, infraestructura). Se tratan y comunican distinto.

---

## 8. Comentarios y documentación en código

- Comentá **por qué**, no **qué**: decisiones, invariantes, trade-offs, referencias a tickets o ADRs.
- Si necesitás un comentario para explicar qué hace el código, el código necesita mejor nombre o estructura.
- `TODO`/`FIXME` siempre con referencia (ticket, ADR, issue) y dueño. Sin referencia → va a `08-known-issues.md`, no al código.
- Sin código comentado. Para eso está Git.
- Documentación pública (XML docs, JSDoc) en contratos y APIs expuestas; no en cada método privado.

---

## 9. Formato y estilo

- Seguí el formatter y linter del repositorio (`.editorconfig`, ESLint, Prettier, analizadores .NET). No discutas con ellos; si una regla es incorrecta, proponé cambiarla en `04-conventions.md`.
- Un cambio de formato masivo nunca viaja en el mismo commit que un cambio funcional.
- Orden consistente dentro de un archivo: dependencias → tipos/constantes → constructor → público → privado (o la convención del repo).

---

## 10. Code smells: qué hacer cuando los ves

| Smell | Acción dentro del alcance | Fuera del alcance |
|---|---|---|
| Duplicación de lógica | Extraer a una función/servicio compartido | Registrar en `08-known-issues.md` |
| Método/clase gigante | Dividir por responsabilidad | Registrar |
| Lista de parámetros larga | Objeto de parámetros | Registrar |
| Clase que solo tiene datos y otra que solo los manipula | Mover comportamiento junto a los datos | Registrar |
| Envidia de características (método que usa más otra clase que la propia) | Mover el método | Registrar |
| Cadenas de `if` por tipo | Polimorfismo / estrategia | Registrar |
| Comentarios explicando código | Renombrar / extraer | Registrar |
| `catch` vacío o genérico | Corregir siempre (es un bug, no estilo) | Registrar como bug |
| Código muerto | Confirmar con el usuario antes de borrar | Registrar |

---

## 11. Checklist de autorrevisión antes de entregar

- [ ] Cada pieza nueva tiene una sola responsabilidad y un nombre que la describe.
- [ ] Busqué lo existente antes de crear; no dupliqué conocimiento.
- [ ] No crucé fronteras de capa; las dependencias van hacia el dominio.
- [ ] Sin magic numbers/strings, sin `any`/`object` evitables, sin parámetros booleanos de comportamiento.
- [ ] Errores manejados explícitamente; mensajes útiles; sin `catch` vacío.
- [ ] Sin secretos, sin código comentado, sin `TODO` huérfanos.
- [ ] Pasa el formatter/linter del repo sin ruido de formato en el diff.
- [ ] Otro senior lo entiende sin que yo se lo explique.
