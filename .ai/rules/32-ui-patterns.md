# 32 — Patrones por tipo de pantalla

> Anexo de `31-ui-design.md`. Se carga solo cuando la tarea diseña o rediseña una pantalla de estos tipos. Los criterios generales (identidad, tokens, estados, accesibilidad) están en `31`.

---

## Patrones

| Pantalla | Reglas específicas |
|---|---|
| **Listado / grilla** | Búsqueda y filtros visibles y persistentes; chips de filtros activos; ordenamiento por columna; paginación o scroll virtual según volumen; acciones por fila al final; selección múltiple con barra de acciones contextual; exportar donde aplique; estado vacío y "sin resultados para estos filtros" diferenciados |
| **Formulario** | Agrupación lógica con títulos; una columna salvo campos cortos relacionados; etiquetas arriba o a la izquierda (consistente); campos con ancho proporcional al contenido esperado (código ≠ descripción); validación al salir del campo y al enviar; errores junto al campo y resumen arriba si son varios; botón primario a la derecha/abajo con verbo específico; cancelar sin énfasis; aviso de cambios sin guardar |
| **Detalle / ficha** | Encabezado con identificación, estado y acciones principales; secciones o pestañas por tema; datos clave primero; historial/auditoría accesible; relación con entidades vinculadas navegable |
| **Dashboard / indicadores** | Pocos indicadores (3-6) con contexto (vs. período anterior, meta); gráficos con el tipo correcto para el dato; sin "chartjunk"; colores semánticos consistentes con el resto; detalle al hacer clic |
| **Asistente / proceso por pasos** | Progreso visible; validación por paso; posibilidad de volver sin perder datos; resumen antes de confirmar; confirmación con número de referencia |
| **Diálogo / modal** | Solo para decisiones puntuales; título que es la pregunta; acción destructiva en color de peligro y a la derecha; foco atrapado; Esc cierra; nunca modal sobre modal |
| **Login / acceso** | Sobrio, de marca, rápido; errores sin revelar qué dato falló; estados de carga claros |

---
