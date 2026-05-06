# 01-context.md

## Que hace el proyecto

`devmentestudio-web` es el sitio corporativo de DevMenteStudio. Su objetivo es presentar servicios de software, mostrar portfolio e informacion institucional, captar consultas comerciales y ofrecer un asistente de chat con IA para respuestas rapidas.

## Dominio funcional

El dominio es marketing y captacion comercial para un software studio. El sitio comunica propuesta de valor, especialidades tecnicas y canales de contacto.

## Objetivos funcionales

- Presentar servicios como landing pages, e-commerce, desarrollo a medida y consultoria.
- Mostrar portfolio y contenido institucional.
- Permitir contacto comercial desde la web.
- Ofrecer chat asistido por IA para preguntas frecuentes.

## Glosario breve

- `SSR`: renderizado del sitio en servidor para SEO y performance.
- `GeminiService`: servicio frontend que conversa con `/api/chat` y aplica fallback local.
- `SeoService`: servicio que sincroniza title, meta tags y canonical por ruta.
- `features`: modulo funcional por pagina o caso de uso.
- `shared`: componentes UI reutilizables y layout comun.
- `core`: servicios globales y logica transversal.

## Publico objetivo

- Empresas o emprendedores que buscan una landing page o sitio comercial.
- Negocios que necesitan e-commerce.
- Clientes que requieren software a medida o consultoria tecnica.

## Estado conocido al iniciar esta documentacion

- El sitio ya cuenta con rutas principales, SEO por ruta y chat con IA.
- El flujo del formulario de contacto hoy es simulado.
- Existen placeholders controlados en algunas secciones, como blog y partes del portfolio.
