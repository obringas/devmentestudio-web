const SYSTEM_INSTRUCTION = `
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
`.trim();

function getApiKey() {
  return (process.env.GEMINI_API_KEY ?? '').replace(/^['"]|['"]$/g, '').trim();
}

function extractResponseText(payload) {
  const firstCandidate = payload?.candidates?.[0];
  const firstPart = firstCandidate?.content?.parts?.[0];
  const text = firstPart?.text;
  return typeof text === 'string' ? text.trim() : '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return res.status(503).json({
      error: 'Servicio de chat no disponible',
      detail: 'Falta configurar GEMINI_API_KEY en Vercel',
    });
  }

  if (!apiKey.startsWith('AIza') || apiKey.length < 35) {
    return res.status(503).json({
      error: 'Servicio de chat no disponible',
      detail: 'GEMINI_API_KEY tiene formato invalido',
    });
  }

  const message = req.body?.message;
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'El campo "message" es requerido' });
  }

  const normalizedMessage = message.trim();
  if (normalizedMessage.length > 4000) {
    return res.status(400).json({ error: 'El mensaje excede el limite permitido' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: normalizedMessage }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({
        error: 'No se pudo procesar la consulta en este momento',
        detail,
      });
    }

    const data = await response.json();
    const text = extractResponseText(data);

    if (!text) {
      return res.status(502).json({
        error: 'Respuesta vacia del proveedor de IA',
      });
    }

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error en /api/chat (Vercel Function):', error);
    return res.status(502).json({
      error: 'No se pudo procesar la consulta en este momento',
    });
  }
};
