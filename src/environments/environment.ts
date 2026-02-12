/**
 * Configuracion del entorno de desarrollo
 *
 * Seguridad: la API key de Gemini NO debe vivir en frontend.
 * El chat usa /api/chat y la key se toma desde GEMINI_API_KEY en el servidor.
 */
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
};
