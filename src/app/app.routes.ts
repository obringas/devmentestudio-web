import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'DevMenteStudio - Desarrollo de Software Profesional',
  },
  {
    path: 'servicios',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/services/services-list.component').then(m => m.ServicesListComponent),
        title: 'Servicios | DevMenteStudio',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/services/service-detail.component').then(m => m.ServiceDetailComponent),
      },
    ],
  },
  {
    path: 'portfolio',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/portfolio/portfolio-list.component').then(m => m.PortfolioListComponent),
        title: 'Portfolio | DevMenteStudio',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/portfolio/project-detail.component').then(m => m.ProjectDetailComponent),
      },
    ],
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Nosotros | DevMenteStudio',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto | DevMenteStudio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
