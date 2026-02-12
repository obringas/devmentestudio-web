import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'DevMenteStudio - Desarrollo de Software Profesional',
    data: {
      description:
        'Desarrollo de software profesional en Salta, Argentina. Landing pages, e-commerce, software a medida y consultoria.',
    },
  },
  {
    path: 'servicios',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/services/services-list.component').then(m => m.ServicesListComponent),
        title: 'Servicios | DevMenteStudio',
        data: {
          description:
            'Conoce nuestros servicios: landing pages, e-commerce, desarrollo a medida y consultoria tecnica.',
        },
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/services/service-detail.component').then(m => m.ServiceDetailComponent),
        title: 'Detalle de Servicio | DevMenteStudio',
        data: {
          description:
            'Detalle del servicio seleccionado, alcance, beneficios y tecnologias recomendadas para tu proyecto.',
        },
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
        data: {
          description:
            'Proyectos y casos de trabajo en desarrollo web, arquitectura y soluciones a medida.',
        },
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/portfolio/project-detail.component').then(m => m.ProjectDetailComponent),
        title: 'Proyecto | DevMenteStudio',
        data: {
          description:
            'Detalle de proyecto y resultados obtenidos en soluciones de software.',
        },
      },
    ],
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Nosotros | DevMenteStudio',
    data: {
      description:
        'Conoce al equipo de DevMenteStudio, nuestra forma de trabajo y el enfoque tecnico que aplicamos en cada proyecto.',
    },
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto | DevMenteStudio',
    data: {
      description:
        'Contactanos para cotizar tu proyecto de software, landing page, e-commerce o consultoria.',
    },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then(m => m.BlogComponent),
    title: 'Blog | DevMenteStudio',
    data: {
      description:
        'Articulos sobre desarrollo de software, arquitectura, performance y buenas practicas.',
    },
  },
  {
    path: 'terminos',
    loadComponent: () =>
      import('./features/legal/terms.component').then(m => m.TermsComponent),
    title: 'Terminos y Condiciones | DevMenteStudio',
    data: {
      description:
        'Terminos y condiciones de uso del sitio web y servicios de DevMenteStudio.',
    },
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./features/legal/privacy.component').then(m => m.PrivacyComponent),
    title: 'Politica de Privacidad | DevMenteStudio',
    data: {
      description:
        'Politica de privacidad y tratamiento de datos personales de DevMenteStudio.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
