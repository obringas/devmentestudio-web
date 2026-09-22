import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent),
    data: {
      pageKey: 'home',
      description: {
        es: 'Modernización gradual de sistemas de gestión, continuidad operativa, software a medida y soluciones digitales desde Salta para toda la Argentina.',
        en: 'Gradual management system modernization, operational continuity, custom software and digital solutions from Salta, Argentina.',
      },
    },
  },
  {
    path: 'modernizacion',
    loadComponent: () =>
      import('./features/modernization/modernization.component').then(m => m.ModernizationComponent),
    data: {
      pageKey: 'modernizacion',
      description: {
        es: 'Modernizamos sistemas de gestión viejos por partes, sin frenar la operación. Diagnóstico de continuidad, datos seguros y facturación electrónica ARCA.',
        en: 'We modernize aging management systems in stages without stopping operations. Continuity assessment, secure data and ARCA electronic invoicing.',
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
            es: 'Conocé nuestros servicios de modernización, software a medida, tiendas online, sitios para captar consultas y diagnóstico técnico.',
            en: 'Explore our modernization, custom software, online store, enquiry website and technical assessment services.',
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
            es: 'Detalle del servicio seleccionado, alcance, beneficios y tecnologías recomendadas para tu proyecto.',
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
            es: 'Casos reales y anonimizados de modernización gradual, facturación electrónica y disponibilidad de datos en producción.',
            en: 'Real anonymized cases in gradual modernization, electronic invoicing and production data availability.',
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
        es: 'Conocé a Oscar Bringas, responsable técnico de DevMenteStudio, y su experiencia modernizando sistemas que sostienen empresas reales.',
        en: 'Meet Oscar Bringas, the technical lead behind DevMenteStudio, and his experience modernizing systems that support real businesses.',
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
        es: 'Contanos qué sistema usa tu empresa. Respondemos dentro de las próximas 24 horas hábiles.',
        en: 'Tell us which system your company relies on. We reply within the next 24 business hours.',
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
        es: 'Artículos sobre desarrollo de software, arquitectura, rendimiento y buenas prácticas.',
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
        es: 'Términos y condiciones de uso del sitio web y servicios de DevMenteStudio.',
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
        es: 'Política de privacidad y tratamiento de datos personales de DevMenteStudio.',
        en: 'Privacy policy and personal data handling for DevMenteStudio.',
      },
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
