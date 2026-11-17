<!-- 1) Línea para docs/07-changelog.md (al inicio del log). Campos separados por " · ", SIN alinear columnas; ≤ 160 caracteres. -->
YYYY-MM-DD · tipo · alcance · +Nuevo.cs ~Modificado.cs db:~Tabla · AB#____ ADR-NNN · →changelog/YYYY-MM-DD-<slug>.md

<!-- 2) Archivo de detalle docs/changelog/YYYY-MM-DD-<slug>.md. Solo lo que no está en la línea. Sin prosa de relleno. -->
# YYYY-MM-DD · tipo(alcance): descripción

**Agente:** <…> · **Work item:** `AB#____` · **Rama:** `feature/____` → `develop`

## Cambios
- <comportamiento o estructura que cambió>

## Motivo
<problema que resuelve, 1-2 líneas>

## Archivos
- `+ruta/Nuevo.cs` — <qué es>
- `~ruta/Modificado.cs` — <qué cambió>

## Base de datos
<tablas/SP/migración + script de reversión, o "No aplica">

## Decisiones
<ADR-NNN, o "No aplica">

## Validaciones
- <build / tests / lint / manual — resultado real, o motivo por el cual no se ejecutó>

## Pendientes
- <o "Ninguno">
