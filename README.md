# DevMenteStudio Web

Sitio web de DevMenteStudio construido con Angular 21 + SSR.

## Requisitos

- Node.js 20+
- npm 10+

## Variables de entorno

Crear archivo `.env` en la raíz:

```env
GEMINI_API_KEY=AIza...
```

Notas:
- La key de Gemini se usa solo en backend (`src/server.ts`).
- No se expone en frontend.
- Debe ser una key válida con formato `AIza...`.

## Desarrollo local

Instalar dependencias:

```bash
npm install
```

Levantar servidor de desarrollo:

```bash
npm start
```

Abrir: `http://localhost:4200/`

## Chat con IA

- El frontend llama a `POST /api/chat`.
- El backend (Express SSR) consume Gemini con `GEMINI_API_KEY`.
- Si Gemini falla, el chat usa fallback local para no romper la UX.

Prueba rápida del endpoint:

```bash
curl -X POST http://localhost:4200/api/chat -H "Content-Type: application/json" -d "{\"message\":\"hola\"}"
```

## Scripts

- `npm run build`: build de producción.
- `npm run test`: tests en modo watch.
- `npm run test:ci`: tests una sola corrida (`--watch=false`).
- `npm run lint`: lint de TypeScript y templates Angular.
- `npm run lint:fix`: lint con autocorrección.
- `npm run check`: `lint + test:ci + build`.

## Despliegue en Vercel

- El proyecto despliega automáticamente en cada `git push` a la rama conectada.
- Configurar `GEMINI_API_KEY` en Vercel:
  - Project Settings -> Environment Variables.
- Si falta o es inválida, `/api/chat` responderá error y el frontend caerá en fallback.

## Troubleshooting

Error:
`API_KEY_INVALID`

Revisar:
- que la key en `.env`/Vercel sea completa y válida (`AIza...`);
- que no tenga comillas o espacios;
- reiniciar el servidor después de cambiar variables.
