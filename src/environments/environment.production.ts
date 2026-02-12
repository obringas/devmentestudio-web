/**
 * Configuracion del entorno de produccion
 *
 * Seguridad: la API key de Gemini NO debe vivir en frontend.
 * Configurar GEMINI_API_KEY en variables de entorno del hosting (ej. Vercel).
 */
export const environment = {
  production: true,
  siteUrl: 'https://devmentestudio.com',
};
