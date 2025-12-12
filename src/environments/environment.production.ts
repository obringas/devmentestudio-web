/**
 * Configuración del entorno de producción
 * 
 * IMPORTANTE: Para producción (Vercel), la API key se debe configurar
 * como variable de entorno en el dashboard de Vercel:
 * Settings > Environment Variables > GEMINI_API_KEY
 * 
 * El server.ts leerá de este environment que será reemplazado en build time.
 */
export const environment = {
    production: true,

    // Para producción, poner aquí la API key o dejar vacío
    // y configurar en Vercel como variable de entorno
    geminiApiKey: 'AIzaSyCuoxmjopJzD-QD93-CSSS3FPE16lS-_Yk',

    // URLs
    siteUrl: 'https://devmentestudio.com',
};
