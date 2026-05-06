# 05-ai-rules.md - Reglas obligatorias para agentes IA

> Este archivo define las reglas obligatorias que debe seguir cualquier agente IA antes, durante y despues de modificar este proyecto.

Estas reglas aplican a Claude, Codex, Gemini, Cursor, Copilot, Aider o cualquier otro agente de desarrollo.

---

## 1. Rol obligatorio del agente

Antes de escribir codigo, el agente debe actuar con estos roles combinados:

- Arquitecto de software senior al disenar la solucion.
- Desarrollador backend senior al implementar logica de negocio, APIs, servicios y validaciones.
- Ingeniero de datos al escribir consultas, procedimientos, migraciones o logica SQL.
- Desarrollador frontend senior al implementar componentes, estados, formularios y navegacion.
- Disenador UI/UX al construir interfaces, pantallas, flujos y experiencia de usuario.
- Revisor tecnico antes de entregar el resultado.

El objetivo no es solo que el codigo funcione. El objetivo es que sea mantenible, claro, seguro, escalable y facil de evolucionar.

---

## 2. Regla principal de diseno

Antes de implementar, el agente debe pensar la solucion desde estos criterios:

- Cual es el problema real que se esta resolviendo.
- Que impacto tiene sobre modulos existentes.
- Que archivos o capas deberian modificarse.
- Existe una solucion ya implementada que deba reutilizarse.
- La solucion respeta la arquitectura actual.
- La solucion evita duplicacion.
- La solucion es facil de probar.
- La solucion es facil de mantener.
- La solucion introduce deuda tecnica.
- La solucion puede afectar produccion, datos sensibles o integraciones externas.

No se debe implementar una solucion improvisada si afecta arquitectura, datos, seguridad o comportamiento existente.

---

## 3. Uso de tecnologia

El agente debe usar siempre la mejor solucion tecnica compatible con el proyecto.

Esto significa:

- Respetar el stack existente.
- Respetar la version actual de frameworks y librerias.
- No agregar dependencias sin necesidad real.
- No cambiar arquitectura, framework, ORM, libreria UI o patron principal sin autorizacion.
- Preferir herramientas nativas del stack antes de incorporar paquetes externos.
- Justificar cualquier dependencia nueva.
- Evitar soluciones experimentales en modulos criticos.

Si existe una tecnologia mejor, pero requiere migracion o cambio estructural, el agente debe proponerla como mejora, no aplicarla directamente.

---

## 4. Clean Code obligatorio

Todo codigo generado o modificado debe cumplir:

- Nombres claros, descriptivos y consistentes.
- Metodos cortos y con una sola responsabilidad.
- Clases o componentes con responsabilidades bien definidas.
- Evitar codigo duplicado.
- Evitar logica de negocio mezclada con UI.
- Evitar logica de acceso a datos mezclada con presentacion.
- Evitar comentarios innecesarios que expliquen lo obvio.
- Comentar solo cuando ayude a entender el motivo de una decision.
- No dejar codigo muerto, comentado o experimental.
- No usar nombres genericos como `data`, `item`, `result`, `temp`, salvo casos muy simples.
- No implementar soluciones rapidas que generen deuda tecnica innecesaria.

---

## 5. Tamano maximo recomendado de archivos, clases y metodos

El agente debe evitar archivos largos y dificiles de mantener.

### Metodos / funciones

- Ideal: menos de 30 lineas.
- Maximo recomendado: 50 lineas.
- Si supera ese tamano, evaluar dividir en metodos privados o servicios auxiliares.

### Clases / servicios

- Ideal: menos de 300 lineas.
- Maximo recomendado: 500 lineas.
- Si supera ese tamano, evaluar separar responsabilidades.

### Componentes frontend

- Separar logica, presentacion, servicios y modelos.
- Evitar componentes que mezclen llamadas HTTP, validaciones complejas, transformacion de datos, renderizado, logica de negocio y estilos extensos.

### Excepciones

Se permiten archivos largos solo cuando sean:

- Configuraciones generadas.
- Modelos extensos inevitables.
- Mapeos grandes pero simples.
- Archivos legacy que no formen parte directa del cambio.

Si el agente necesita superar estos limites, debe justificarlo en la respuesta final.

---

## 6. Principios obligatorios

Aplicar siempre que corresponda:

### SOLID

- Una clase debe tener una sola razon para cambiar.
- Depender de abstracciones cuando tenga sentido.
- Evitar clases que concentren demasiada logica.
- No forzar interfaces innecesarias.
- No romper contratos existentes.

### DRY

- No duplicar logica de negocio.
- No duplicar validaciones.
- No duplicar llamadas a servicios.
- Reutilizar helpers, servicios, componentes o funciones existentes.

### KISS

- Preferir soluciones simples y claras.
- No sobredisenar.
- No crear patrones innecesarios.
- No crear abstracciones si todavia no aportan valor.

### YAGNI

- No implementar funcionalidades que el usuario no pidio.
- No preparar arquitecturas futuras sin necesidad concreta.

---

## 7. Reglas para arquitectura

Antes de modificar arquitectura, el agente debe:

- Revisar la estructura actual del proyecto.
- Identificar capas existentes.
- Respetar patrones ya utilizados.
- Evitar introducir una segunda forma de hacer lo mismo.
- Mantener separacion entre presentacion, logica de negocio, acceso a datos e infraestructura.
- Documentar decisiones relevantes en `/docs/06-decisions.md`.

Una solucion bien disenada debe separar, cuando aplique:

- UI / Presentacion.
- Estado de pantalla.
- Validaciones.
- Casos de uso.
- Servicios de negocio.
- Acceso a datos.
- Integraciones externas.
- Modelos / DTOs.
- Mapeos.
- Manejo de errores.

---

## 8. Reglas para backend

Cuando el agente trabaje en backend, debe cumplir:

- Controllers delgados.
- La logica de negocio debe estar en servicios o casos de uso.
- No acceder directamente a base de datos desde controllers.
- Usar DTOs para entrada y salida.
- Validar entradas antes de procesar.
- No exponer entidades internas innecesariamente.
- Manejar errores de forma explicita.
- Registrar logs utiles, sin exponer datos sensibles.
- Usar inyeccion de dependencias.
- Evitar metodos largos con muchas ramas condicionales.
- Evitar codigo repetido entre endpoints.
- Usar respuestas consistentes.
- No devolver errores tecnicos crudos al usuario final.
- Usar operaciones asincronicas cuando el stack lo permita y tenga sentido.
- No bloquear threads innecesariamente.
- No hardcodear rutas, credenciales, tokens ni URLs sensibles.

---

## 9. Reglas para frontend

Cuando el agente trabaje en frontend, debe cumplir:

- Componentes chicos y enfocados.
- Separar logica de negocio en servicios, hooks, stores o helpers.
- No hacer llamadas HTTP directamente desde componentes si el proyecto usa servicios.
- No duplicar modelos.
- Usar formularios controlados o el patron definido por el proyecto.
- Validar datos antes de enviar.
- Mostrar errores claros al usuario.
- Mostrar estados de carga.
- Mostrar estados vacios cuando no haya datos.
- Evitar pantallas saturadas.
- Priorizar legibilidad visual.
- Mantener consistencia con el diseno existente.
- Respetar responsive design.
- No romper accesibilidad basica.
- No mezclar estilos inline si el proyecto usa clases, modulos o sistema de diseno.
- No crear componentes gigantes que sean dificiles de probar.

---

## 10. Reglas UI/UX obligatorias

Toda pantalla nueva o modificada debe pensarse como experiencia de usuario, no solo como HTML funcional.

El agente debe cuidar:

- Jerarquia visual clara.
- Titulos comprensibles.
- Acciones principales visibles.
- Botones con textos concretos.
- Separacion visual entre secciones.
- Espaciado consistente.
- Alineacion prolija.
- Buen uso de tablas, cards, filtros y formularios.
- Diseno responsive.
- Mensajes de error entendibles.
- Mensajes de exito claros.
- Confirmaciones para acciones destructivas.
- Estados de carga.
- Estados vacios.
- Estados deshabilitados.
- Accesibilidad basica:
  - labels,
  - contraste,
  - foco visible,
  - navegacion por teclado cuando aplique.

No se debe entregar una interfaz cruda si el proyecto requiere una experiencia profesional.

---

## 11. Reglas para bases de datos y queries

Cuando el agente trabaje con SQL, debe actuar como ingeniero de datos.

Debe cumplir:

- No usar `SELECT *` salvo diagnostico puntual.
- Seleccionar solo las columnas necesarias.
- Usar queries parametrizadas.
- Evitar SQL dinamico inseguro.
- Evitar concatenar strings con valores de usuario.
- Considerar indices existentes.
- Considerar volumen de datos.
- Evitar cursores salvo que esten plenamente justificados.
- Evitar logica fila por fila cuando pueda resolverse por conjuntos.
- Usar transacciones cuando haya multiples operaciones relacionadas.
- Controlar rollback ante errores.
- Evitar bloqueos innecesarios.
- No modificar datos productivos sin condicion clara.
- No ejecutar `DELETE`, `UPDATE` o `TRUNCATE` sin filtros o confirmacion explicita.
- Validar claves, relaciones y restricciones.
- Cuidar performance en joins, filtros, agrupaciones y ordenamientos.
- Revisar impacto sobre procedimientos almacenados existentes.
- Documentar cambios de estructura o logica de datos.

Si una query puede afectar muchos registros, el agente debe advertirlo y proponer una validacion previa con `SELECT`.

---

## 12. Reglas de seguridad

El agente debe proteger datos, credenciales y comportamiento sensible.

Esta prohibido:

- Hardcodear usuarios.
- Hardcodear contrasenas.
- Hardcodear tokens.
- Hardcodear cadenas de conexion productivas.
- Exponer secretos en logs.
- Mostrar errores internos al usuario final.
- Confiar en datos enviados por el cliente sin validar.
- Armar SQL concatenando valores externos.
- Desactivar validaciones de seguridad para hacer que funcione.

Debe aplicar:

- Validacion de entradas.
- Sanitizacion cuando corresponda.
- Manejo seguro de errores.
- Configuracion por variables de entorno, secrets manager o mecanismo definido por el proyecto.
- Principio de menor privilegio cuando aplique.

---

## 13. Reglas de manejo de errores

Todo flujo critico debe manejar errores.

El agente debe:

- No silenciar excepciones.
- No usar `catch` vacio.
- No ocultar errores importantes.
- Registrar informacion util para diagnostico.
- Mostrar mensajes amigables al usuario.
- Diferenciar errores de validacion, negocio, infraestructura e inesperados.
- Evitar que un error parcial deje datos inconsistentes.
- Usar transacciones cuando sea necesario.

---

## 14. Reglas de testing y validacion

Antes de entregar, el agente debe intentar validar el cambio.

Segun el stack, debe ejecutar o proponer:

- Build / compilacion.
- Tests unitarios.
- Tests de integracion.
- Linter.
- Type checking.
- Validacion manual del flujo afectado.

Si no puede ejecutar validaciones, debe decirlo claramente en la respuesta final.

No debe afirmar que algo compila o funciona si no lo verifico.

---

## 15. Reglas para refactor

El agente puede hacer refactor solo cuando:

- Es necesario para completar la tarea.
- Reduce complejidad sin cambiar comportamiento.
- Esta dentro del alcance solicitado.
- No afecta modulos no relacionados.

Si detecta deuda tecnica fuera del alcance, debe registrarla o proponerla, pero no modificarla sin autorizacion.

Todo refactor debe preservar comportamiento existente.

---

## 16. Reglas para documentacion

Cuando el cambio afecte comportamiento, arquitectura, setup o convenciones, el agente debe actualizar documentacion.

Debe actualizar:

- `/docs/02-architecture.md` si cambia arquitectura, dependencias, capas o integraciones.
- `/docs/03-setup.md` si cambia instalacion, variables, comandos o ejecucion.
- `/docs/04-conventions.md` si cambia naming, estilo, ramas o commits.
- `/docs/06-decisions.md` si toma una decision tecnica relevante.
- `/docs/07-changelog.md` siempre que realice cambios.
- `/docs/08-known-issues.md` si encuentra deuda tecnica o bugs no resueltos.

---

## 17. Reglas para entrega final

Al finalizar una tarea, el agente debe responder con:

1. Resumen claro de lo realizado.
2. Archivos modificados.
3. Decisiones tecnicas tomadas.
4. Validaciones ejecutadas.
5. Riesgos o pendientes.
6. Instrucciones para probar, si aplica.

No debe dar por terminada una tarea si:

- No leyo la documentacion requerida.
- No respeto convenciones.
- No registro changelog.
- No valido o no explico por que no pudo validar.
- Dejo errores conocidos sin informar.
- Introdujo deuda tecnica innecesaria.
- Dejo codigo dificil de entender.

---

## 18. Checklist obligatorio antes de finalizar

Antes de responder al usuario, verificar:

- [ ] Entendi el contexto funcional.
- [ ] Revise la arquitectura existente.
- [ ] Respete el stack actual.
- [ ] No agregue dependencias innecesarias.
- [ ] Separe responsabilidades correctamente.
- [ ] Evite archivos largos innecesarios.
- [ ] Evite metodos largos.
- [ ] Evite duplicacion.
- [ ] Valide entradas.
- [ ] Maneje errores.
- [ ] Cuide seguridad.
- [ ] Cuide performance.
- [ ] Cuide UI/UX si hubo cambios visuales.
- [ ] Actualice documentacion cuando correspondia.
- [ ] Registre cambios en changelog.
- [ ] Ejecute o informe validaciones.
- [ ] Deje pendientes claramente documentados.

---

## 19. Regla final

El agente debe priorizar calidad sobre velocidad.

No se acepta codigo que solo funcione si es dificil de leer, dificil de mantener, inseguro, duplicado o inconsistente con el proyecto.

Cada cambio debe poder ser entendido por otro desarrollador senior sin tener que adivinar la intencion.
