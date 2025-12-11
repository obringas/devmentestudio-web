import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Rutas estáticas - prerender
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'servicios',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portfolio',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'nosotros',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contacto',
    renderMode: RenderMode.Prerender
  },
  // Rutas dinámicas - SSR
  {
    path: 'servicios/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'portfolio/:slug',
    renderMode: RenderMode.Server
  },
  // Fallback
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
