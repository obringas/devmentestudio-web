# INDEX — Árbol de contexto

> Generado por `node .ai/tools/regen-index.js`. **No editar a mano**: regenerar al cerrar cada tarea que cambie una sección.
> Una línea por sección `##` (ancla + resumen ≤ 80). Leer el índice, abrir **solo la sección** necesaria por ancla, nunca el archivo entero.
> Topes: ≤ 150 líneas, ≤ 12 KB. Docs no canónicos en `INDEX-anexos.md`. Docs con > 25 secciones: una línea acá + índice propio.

```text
docs/
├─ README.md
│  ├─ #estado-documental Estructura canónica 00…09 bajo el protocolo 5.7.0 (migrado el 2026-11-17).
│  └─ #fuentes-integradas AI_CONTEXT.md, README.md, package.json, angular.json, eslint.config.js y src/.
├─ 00-repo-map.md
│  ├─ #raiz .ai/ protocolo de agentes IA (reglas, plantillas, herramientas); no editar a ma…
│  ├─ #src src/app/config/ configuración del sitio (site.config.ts)
│  └─ #que-no-va-ahi Copy de UI dentro de componentes: va en src/app/data/.
├─ 01-context.md
│  ├─ #que-hace-el-proyecto devmentestudio-web es el sitio corporativo de DevMenteStudio. Su objetivo es pr…
│  ├─ #dominio-funcional El dominio es marketing y captacion comercial para un software studio. El sitio…
│  ├─ #objetivos-funcionales Presentar servicios como landing pages, e-commerce, desarrollo a medida y consu…
│  ├─ #glosario-breve SSR: renderizado del sitio en servidor para SEO y performance.
│  ├─ #publico-objetivo Empresas o emprendedores que buscan una landing page o sitio comercial.
│  └─ #estado-conocido-al-iniciar-esta-documentacion El sitio ya cuenta con rutas principales, SEO por ruta y chat con IA.
├─ 02-architecture.md
│  ├─ #stack Angular 21 con standalone components.
│  ├─ #estructura-principal src/
│  ├─ #organizacion-por-capas features: paginas y casos de uso visibles para el usuario.
│  ├─ #rutas-actuales /
│  ├─ #capa-de-contenido-y-componentes-de-negocio El posicionamiento bilingüe de Home y Modernización se centraliza en business-c…
│  ├─ #backend-y-ssr src/server.ts levanta Express, carga variables de entorno con dotenv, expone PO…
│  ├─ #flujo-de-chat El usuario envia un mensaje desde app-chat.
│  ├─ #flujo-de-contacto El usuario completa el formulario reactivo en /contacto.
│  ├─ #seo La metadata se define por ruta (title y data.description) y SeoService actualiz…
│  ├─ #principios-observados-en-el-codigo Standalone components.
│  ├─ #integraciones-externas Google Gemini para el chat.
│  ├─ #activos-de-marca public/logo-nuevo.png: fuente maestra cuadrada y activo de metadata social.
│  └─ #riesgos-arquitectonicos-actuales Hay una carpeta api/ con chat.js y tambien existe src/server.ts; cualquier camb…
├─ 03-setup.md
│  ├─ #requisitos Node.js 22.x segun package.json.
│  ├─ #instalacion npm install
│  ├─ #variables-de-entorno Crear .env en la raiz:
│  ├─ #formulario-de-contacto El formulario usa Web3Forms directamente desde el navegador, como recomienda el…
│  ├─ #comandos-principales npm start
│  ├─ #flujo-recomendado-local Instalar dependencias con npm install.
│  ├─ #prueba-rapida-del-chat curl -X POST http://localhost:4200/api/chat -H "Content-Type: application/json"…
│  ├─ #build-y-ssr npm run build genera la aplicacion Angular SSR.
│  ├─ #validacion-visual-y-lighthouse Revisar como mínimo /, /modernizacion, /servicios, /portfolio, /nosotros y /con…
│  └─ #deploy El proyecto esta preparado para deploy automatizado en Vercel. La variable GEMI…
├─ 04-conventions.md
│  ├─ #convenciones-generales Mantener mensajes, textos de UI y commits en castellano, salvo que una API o li…
│  ├─ #typescript-y-angular Usar standalone components.
│  ├─ #estilo-de-codigo singleQuote: true.
│  ├─ #frontend Componentes chicos y con una responsabilidad clara.
│  ├─ #backend Validar entradas antes de procesar.
│  └─ #ramas-y-commits Preferencia del proyecto: mensajes de commit en castellano y descriptivos.
├─ 05-ai-rules.md
│  ├─ #restricciones Contenido comercial: sin afirmaciones absolutas, sin métricas inventadas, sin n…
│  ├─ #excepciones-a-airules Excepciones a `.ai/rules/`
│  └─ #contexto-que-el-agente-debe-saber Sitio corporativo Angular 21 SSR desplegado en Vercel; sin base de datos.
├─ 06-decisions.md
│  ├─ #adr-0001-mantener-ia-solo-en-backend-con-fallback-local-en-frontend ADR-0001 - Mantener IA solo en backend con fallback local en frontend
│  ├─ #adr-0002-documentacion-base-estandarizada-en-docs ADR-0002 - Documentacion base estandarizada en `/docs`
│  ├─ #adr-0003-integrar-el-formulario-de-contacto-mediante-un-servicio-web3forms ADR-0003 - Integrar el formulario de contacto mediante un servicio Web3Forms
│  └─ #adr-0004-reposicionar-el-sitio-alrededor-de-continuidad-operativa ADR-0004 - Reposicionar el sitio alrededor de continuidad operativa
├─ 07-changelog.md log compacto · 1 línea por cambio; detalle en changelog/
├─ 08-known-issues.md
│  ├─ #activos-editoriales-definitivos-pendientes Activos editoriales definitivos pendientes
│  ├─ #rendimiento-movil-condicionado-por-fuentes-remotas Rendimiento móvil condicionado por fuentes remotas
│  ├─ #headers-de-seguridad-http-pendientes-resuelto Headers de seguridad HTTP pendientes (resuelto)
│  ├─ #duplicacion-potencial-entre-apichatjs-y-srcserverts Duplicacion potencial entre `api/chat.js` y `src/server.ts`
│  ├─ #formulario-de-contacto-sin-persistencia-real-resuelto Formulario de contacto sin persistencia real (resuelto)
│  ├─ #tailwind-3-declarado-con-el-plugin-postcss-de-tailwind-4 Tailwind 3 declarado con el plugin PostCSS de Tailwind 4
│  ├─ #sin-ci-remoto Sin CI remoto
│  ├─ #ai_contextmd-se-superpone-con-docs `AI_CONTEXT.md` se superpone con `/docs`
│  ├─ #02-architecturemd-sin-seccion-sistema-visual `02-architecture.md` sin sección "Sistema visual"
│  ├─ #npm-run-check-falla-con-eperm-al-limpiar-dist-windows `npm run check` falla con EPERM al limpiar `dist/` (Windows)
│  └─ #check-contextjs-marca-falso-positivo-de-secreto-en-apichatjs35 `check-context.js` marca falso positivo de secreto en `api/chat.js:35`
├─ 09-working-state.md terminada · Sin tarea en curso
└─ DESIGN.md 8 secciones · leer por ancla, nunca entero
```
