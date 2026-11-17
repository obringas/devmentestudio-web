# AGENTS.md — <Módulo o App>

> Contexto **local** de `<ruta>/`. Se carga solo al trabajar acá; complementa al `AGENTS.md` raíz, nunca lo contradice. Máximo ~40 líneas: si crece, va a `/docs` y acá queda el enlace.
> **Si es una app con `/docs` propia** (monorepo backend/frontend): declarar stack y ruta de docs en "Qué es"; las rutas `docs/…` del protocolo se resuelven contra esa carpeta.
> Codex y Claude Code lo cargan solos por cercanía de carpeta; Gemini y otros: el `AGENTS.md` raíz instruye buscarlo.

## Qué es
<1-2 líneas: responsabilidad del módulo y qué NO hace>
- Stack: `backend-dotnet | frontend-angular` · Docs: `./docs/` (índice en `./docs/INDEX.md`) ← solo si es app con docs propia

## Mapa
```text
<ruta>/
├─ <carpeta>/   <qué hay>
└─ <archivo>    <punto de entrada>
```

## Datos
- Tablas: `Esquema.Tabla` (replicada: sí/no) · `…`
- SP/vistas: `usp_…`
- Auditoría: estándar · historial en `…`

## Reglas de negocio locales
- <regla> → `Archivo.cs:Metodo` · fuente: `docs/01-context.md#reglas-negocio`

## Dependencias
- Usa: `<módulo>` · Lo usan: `<módulo>`
- Contratos expuestos: `<endpoint / interfaz>`

## Trampas conocidas
- <comportamiento no obvio, bug histórico, orden de operaciones> → `docs/08-known-issues.md#…`

## Cómo probar
- `<comando o test que cubre este módulo>`
