# 02-architecture.md

## Stack

- Angular 21 con standalone components.
- TypeScript 5.9.
- SSR con `@angular/ssr` y Express.
- Estilos con Tailwind CSS y SCSS.
- RxJS para flujos async.
- `@google/generative-ai` del lado servidor.
- Deploy orientado a Vercel.

## Estructura principal

```text
src/
  app/
    config/
    core/
      services/
    data/
    features/
    models/
    shared/
  environments/
  main.ts
  main.server.ts
  server.ts
```

## Organizacion por capas

- `features`: paginas y casos de uso visibles para el usuario.
- `shared`: componentes de layout y UI reutilizable.
- `core`: servicios transversales, como chat y SEO.
- `data`: catalogos estaticos y datos base.
- `models`: contratos tipados del dominio.
- `server.ts`: composicion del servidor SSR y endpoints backend.

## Rutas actuales

- `/`
- `/modernizacion`
- `/servicios`
- `/servicios/:slug`
- `/portfolio`
- `/portfolio/:slug`
- `/nosotros`
- `/contacto`
- `/blog`
- `/terminos`
- `/privacidad`

Las rutas usan lazy loading con `loadComponent`.

## Capa de contenido y componentes de negocio

El posicionamiento bilingüe de Home y Modernización se centraliza en `business-content.data.ts`. Las páginas componen ese contenido con componentes reutilizables de `shared/components/business` para señales, proceso, casos, responsable, detalle técnico, preguntas frecuentes y cierre comercial.

La jerarquía de cada página sigue una lectura orientada a negocio: riesgo operativo, cambio esperado, método gradual, evidencia y contacto. Los detalles de stack quedan en acordeones secundarios y no compiten con el mensaje principal.

## Backend y SSR

`src/server.ts` levanta Express, carga variables de entorno con `dotenv`, expone `POST /api/chat`, sirve estaticos del build SSR y delega el resto a Angular SSR.

El endpoint de chat:

- valida que exista `GEMINI_API_KEY`;
- valida `message`;
- limita el payload;
- llama a Gemini con `gemini-2.5-flash`;
- responde errores controlados sin exponer detalles tecnicos.

## Flujo de chat

1. El usuario envia un mensaje desde `app-chat`.
2. `GeminiService` hace `POST /api/chat`.
3. El backend consulta Gemini usando la API key del servidor.
4. Si falla, el frontend devuelve respuestas de fallback local.

## Flujo de contacto

1. El usuario completa el formulario reactivo en `/contacto`.
2. `ContactComponent` valida la entrada y delega el envío a `ContactService`.
3. `ContactService` construye un `FormData` tipado y hace `POST` multipart desde el navegador a Web3Forms, sin fijar manualmente `Content-Type` y sin disparar un preflight JSON innecesario.
4. La UI muestra éxito únicamente ante HTTP 200 con `success: true`; cualquier otro resultado conserva los datos y ofrece email y WhatsApp como alternativas.

La access key de Web3Forms es un identificador público requerido por el proveedor en el cliente. La configuración se centraliza en `site.config.ts` y no se trata como una credencial de backend.

En producción, la CSP de `vercel.json` autoriza explícitamente `https://api.web3forms.com` en `connect-src`. Toda integración HTTP cliente nueva debe incorporarse a esa allowlist.

## SEO

La metadata se define por ruta (`title` y `data.description`) y `SeoService` actualiza:

- `meta description`
- Open Graph
- Twitter cards
- canonical
- `hreflang` para español, inglés y `x-default`
- JSON-LD de `ProfessionalService` y `Person`

Las rutas públicas principales se prerenderizan, incluyendo `/modernizacion`. `public/robots.txt` y `public/sitemap.xml` declaran el conjunto indexable. El idioma se conserva mediante `?lang=es|en`, con español como salida SSR predeterminada.

## Principios observados en el codigo

- Standalone components.
- `ChangeDetectionStrategy.OnPush` en componentes relevantes.
- Estado local con `signal`.
- Formularios reactivos.
- Configuracion sensible solo en servidor.

## Integraciones externas

- Google Gemini para el chat.
- Web3Forms para el envío del formulario de contacto.
- Vercel para despliegue.
- Google Fonts para las familias visuales Cormorant Garamond y Outfit.

## Activos de marca

- `public/logo-nuevo.png`: fuente maestra cuadrada y activo de metadata social.
- `public/logo-nuevo-compact.png`: variante optimizada para header y footer.
- `public/favicon-concept-c.ico`: favicon multirresolución activo.
- `public/favicon-concept-c.png`: Apple touch icon.

La selección por contexto evita reducir el logo maestro con su espacio interno dentro de superficies pequeñas. Las reglas completas de uso visual se documentan en `DESIGN.md`.

## Riesgos arquitectonicos actuales

- Hay una carpeta `api/` con `chat.js` y tambien existe `src/server.ts`; cualquier cambio futuro debe evitar duplicar la logica del endpoint.
- La CSP de producción debe mantenerse sincronizada con las integraciones externas utilizadas por el frontend.
- Las fuentes remotas son el principal recurso bloqueante observado en Lighthouse móvil; se mantiene el criterio visual y queda abierta una futura estrategia de self-hosting.
