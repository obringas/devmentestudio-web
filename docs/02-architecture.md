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

## SEO

La metadata se define por ruta (`title` y `data.description`) y `SeoService` actualiza:

- `meta description`
- Open Graph
- Twitter cards
- canonical

## Principios observados en el codigo

- Standalone components.
- `ChangeDetectionStrategy.OnPush` en componentes relevantes.
- Estado local con `signal`.
- Formularios reactivos.
- Configuracion sensible solo en servidor.

## Integraciones externas

- Google Gemini para el chat.
- Vercel para despliegue.

## Riesgos arquitectonicos actuales

- El formulario de contacto no persiste ni integra backend.
- Hay una carpeta `api/` con `chat.js` y tambien existe `src/server.ts`; cualquier cambio futuro debe evitar duplicar la logica del endpoint.
- Faltan headers HTTP de seguridad endurecidos.
