import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'servicios',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'portfolio',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'nosotros',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contacto',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'terminos',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'privacidad',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'servicios/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'portfolio/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
