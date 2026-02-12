import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import { join } from 'node:path';

dotenv.config({ override: true });

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const geminiApiKey = (process.env['GEMINI_API_KEY'] ?? '')
  .replace(/^['"]|['"]$/g, '')
  .trim();
const isGeminiKeyFormatValid = geminiApiKey.startsWith('AIza') && geminiApiKey.length > 30;
const systemInstruction = `
Rol: Asistente virtual de DevMenteStudio (Software Studio en Salta, Argentina).
Contacto: contacto@devmentestudio.com | https://devmentestudio.com | +54 9 387 451-3777

SERVICIOS:
1. Landing Pages: Diseno responsive, SEO, Angular/Next.js/Tailwind.
2. E-commerce: Tiendas escalables, pagos (Stripe/MP), .NET/SQL.
3. Desarrollo a Medida: Soluciones personalizadas, .NET/Node.js/PostgreSQL/Azure.
4. Consultoria: Arquitectura, auditoria, CI/CD, migracion legacy.

INSTRUCCIONES:
- Responde en espanol, se profesional y conciso.
- Precios: Solicitar presupuesto en /contacto.
- Dudas: Sugerir email.
`;

const geminiModel = geminiApiKey
  ? new GoogleGenerativeAI(geminiApiKey).getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
    })
  : null;

if (geminiApiKey && !isGeminiKeyFormatValid) {
  console.warn('GEMINI_API_KEY tiene formato invalido. Debe comenzar con "AIza".');
}

app.use(express.json({ limit: '1mb' }));

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Chat API endpoint (server-side Gemini integration)
 */
app.post('/api/chat', async (req, res) => {
  if (!geminiModel) {
    res.status(503).json({
      error: 'Servicio de chat no disponible',
      detail: 'Falta configurar GEMINI_API_KEY en el servidor',
    });
    return;
  }

  const message = req.body?.message;
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'El campo "message" es requerido' });
    return;
  }

  if (message.length > 4000) {
    res.status(400).json({ error: 'El mensaje excede el limite permitido' });
    return;
  }

  try {
    const result = await geminiModel.generateContent(message.trim());
    const responseText = result.response.text();
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(502).json({ error: 'No se pudo procesar la consulta en este momento' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
