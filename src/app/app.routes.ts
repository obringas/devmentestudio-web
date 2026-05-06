import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent),
    data: {
      pageKey: 'home',
      description: {
        es: 'Desarrollo de software profesional en Salta, Argentina. Landing pages, e-commerce, software a medida y consultoria.',
        en: 'Professional software development in Salta, Argentina. Landing pages, e-commerce, custom software and consulting.',
      },
    },
  },
  {
    path: 'servicios',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/services/services-list.component').then(m => m.ServicesListComponent),
        data: {
          pageKey: 'services',
          description: {
            es: 'Conoce nuestros servicios: landing pages, e-commerce, desarrollo a medida y consultoria tecnica.',
            en: 'Explore our services: landing pages, e-commerce, custom development and technical consulting.',
          },
        },
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/services/service-detail.component').then(m => m.ServiceDetailComponent),
        data: {
          pageKey: 'service-detail',
          description: {
            es: 'Detalle del servicio seleccionado, alcance, beneficios y tecnologias recomendadas para tu proyecto.',
            en: 'Selected service details, scope, benefits and recommended technologies for your project.',
          },
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
        data: {
          pageKey: 'portfolio',
          description: {
            es: 'Proyectos y casos de trabajo en desarrollo web, arquitectura y soluciones a medida.',
            en: 'Projects and case studies in web development, architecture and custom software solutions.',
          },
        },
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/portfolio/project-detail.component').then(m => m.ProjectDetailComponent),
        data: {
          pageKey: 'project-detail',
          description: {
            es: 'Detalle de proyecto y resultados obtenidos en soluciones de software.',
            en: 'Project details and results achieved through software solutions.',
          },
        },
      },
    ],
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    data: {
      pageKey: 'about',
      description: {
        es: 'Conoce al equipo de DevMenteStudio, nuestra forma de trabajo y el enfoque tecnico que aplicamos en cada proyecto.',
        en: 'Meet the DevMenteStudio team, our way of working and the technical approach we bring to every project.',
      },
    },
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: {
      pageKey: 'contact',
      description: {
        es: 'Contactanos para cotizar tu proyecto de software, landing page, e-commerce o consultoria.',
        en: 'Contact us to quote your software project, landing page, e-commerce or consulting engagement.',
      },
    },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then(m => m.BlogComponent),
    data: {
      pageKey: 'blog',
      description: {
        es: 'Articulos sobre desarrollo de software, arquitectura, performance y buenas practicas.',
        en: 'Articles about software development, architecture, performance and engineering best practices.',
      },
    },
  },
  {
    path: 'terminos',
    loadComponent: () =>
      import('./features/legal/terms.component').then(m => m.TermsComponent),
    data: {
      pageKey: 'terms',
      description: {
        es: 'Terminos y condiciones de uso del sitio web y servicios de DevMenteStudio.',
        en: 'Terms and conditions for the use of the DevMenteStudio website and services.',
      },
    },
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./features/legal/privacy.component').then(m => m.PrivacyComponent),
    data: {
      pageKey: 'privacy',
      description: {
        es: 'Politica de privacidad y tratamiento de datos personales de DevMenteStudio.',
        en: 'Privacy policy and personal data handling for DevMenteStudio.',
      },
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
