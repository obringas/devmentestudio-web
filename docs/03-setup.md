# 03-setup.md

## Requisitos

- Node.js 22.x segun `package.json`.
- npm 10.x.

## Instalacion

```bash
npm install
```

## Variables de entorno

Crear `.env` en la raiz:

```env
GEMINI_API_KEY=AIza...
```

Consideraciones:

- La key se usa solo en backend.
- Debe comenzar con `AIza`.
- Si cambia la variable, reiniciar el servidor.

## Formulario de contacto

El formulario usa Web3Forms directamente desde el navegador, como recomienda el proveedor. Su endpoint, asunto y access key pública están centralizados en `src/app/config/site.config.ts`; no requieren una variable secreta del servidor.

La CSP configurada en `vercel.json` debe incluir `https://api.web3forms.com` dentro de `connect-src`; de lo contrario el navegador bloquea el envío antes de realizar el `POST`.

Para validar el flujo completo, primero desplegar y luego realizar un único envío real desde producción. Confirmar tanto el mensaje de éxito en la UI como la recepción en `contacto@devmentestudio.com`.

## Comandos principales

```bash
npm start
npm run build
npm test
npm run test:ci
npm run lint
npm run lint:fix
npm run check
```

## Flujo recomendado local

1. Instalar dependencias con `npm install`.
2. Configurar `.env`.
3. Ejecutar `npm run check`.
4. Levantar el sitio con `npm start`.

## Prueba rapida del chat

```bash
curl -X POST http://localhost:4200/api/chat -H "Content-Type: application/json" -d "{\"message\":\"hola\"}"
```

## Build y SSR

- `npm run build` genera la aplicacion Angular SSR.
- El servidor SSR resultante puede ejecutarse con `node dist/devmentestudio-web/server/server.mjs`.

## Deploy

El proyecto esta preparado para deploy automatizado en Vercel. La variable `GEMINI_API_KEY` debe configurarse en los entornos del proyecto.
