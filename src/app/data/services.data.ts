import { AppLanguage } from '../core/services/locale.service';
import { Service } from '../models';

type LocalizedText = Record<AppLanguage, string>;

type LocalizedService = Omit<Service, 'title' | 'shortDescription' | 'fullDescription' | 'features' | 'benefits' | 'cta'> & {
  readonly title: LocalizedText;
  readonly shortDescription: LocalizedText;
  readonly fullDescription: LocalizedText;
  readonly features: Record<AppLanguage, readonly string[]>;
  readonly benefits: Record<
    AppLanguage,
    readonly {
      readonly title: string;
      readonly description: string;
      readonly icon: string;
    }[]
  >;
  readonly cta: {
    readonly text: LocalizedText;
    readonly href: string;
  };
};

const LOCALIZED_SERVICES: readonly LocalizedService[] = [
  {
    id: 'modernizacion',
    slug: 'modernizacion',
    title: {
      es: 'Modernización de Sistemas Legacy',
      en: 'Legacy Systems Modernization',
    },
    shortDescription: {
      es: 'Migración gradual de sistemas Visual FoxPro, Visual Basic y Clipper a .NET 8 y SQL Server sin frenar la operación diaria.',
      en: 'Gradual migration of Visual FoxPro, Visual Basic and Clipper systems to .NET 8 and SQL Server without halting daily operations.',
    },
    fullDescription: {
      es: 'Migramos sistemas críticos de gestión hacia arquitecturas modernas .NET 8 y bases de datos SQL Server. Convivencia entre el sistema histórico y la nueva plataforma, migración de datos DBF y avance por etapas con vuelta atrás en cada paso.',
      en: 'We migrate mission-critical business systems to modern .NET 8 architectures and SQL Server databases. Coexistence between legacy software and the new platform, DBF data migration, and phased modular execution with full rollback capabilities.',
    },
    icon: 'refresh-cw',
    features: {
      es: [
        'Migración gradual sin big bang',
        'Convivencia de datos DBF y SQL Server',
        'Reescritura por módulos con Clean Architecture',
        'Facturación electrónica ARCA',
        'Replicación transaccional hacia Azure',
        'Reversibilidad técnica en cada etapa',
      ],
      en: [
        'Gradual migration without big bang',
        'DBF and SQL Server data coexistence',
        'Modular rewrite with Clean Architecture',
        'ARCA electronic invoicing integration',
        'Transactional replication and Azure',
        'Technical rollback at each stage',
      ],
    },
    technologies: [
      { name: '.NET 8', icon: 'dotnet' },
      { name: 'SQL Server', icon: 'database' },
      { name: 'Visual FoxPro', icon: 'code' },
      { name: 'Azure', icon: 'cloud' },
    ],
    benefits: {
      es: [
        {
          title: 'Continuidad operativa',
          description: 'Tu empresa sigue operando mientras los nuevos módulos se prueban y habilitan.',
          icon: 'shield',
        },
        {
          title: 'Vuelta atrás garantizada',
          description: 'Si un módulo nuevo no responde como se esperaba, se puede retroceder.',
          icon: 'refresh-cw',
        },
        {
          title: 'Transferible y documentado',
          description: 'Arquitectura limpia para que cualquier equipo .NET pueda darle continuidad.',
          icon: 'file-text',
        },
      ],
      en: [
        {
          title: 'Operational continuity',
          description: 'Your business continues operating while new modules are validated.',
          icon: 'shield',
        },
        {
          title: 'Guaranteed rollback',
          description: 'If a new module does not behave as expected, you can safely revert.',
          icon: 'refresh-cw',
        },
        {
          title: 'Transferable & documented',
          description: 'Clean architecture so any professional .NET engineering team can maintain it.',
          icon: 'file-text',
        },
      ],
    },
    cta: {
      text: {
        es: 'Pedir diagnóstico técnico',
        en: 'Request technical diagnosis',
      },
      href: '/modernizacion',
    },
  },
  {
    id: 'landing-pages',
    slug: 'landing-pages',
    title: {
      es: 'Landing Pages',
      en: 'Landing Pages',
    },
    shortDescription: {
      es: 'Páginas de aterrizaje optimizadas para conversión que capturan leads y generan resultados.',
      en: 'Conversion-focused landing pages built to capture leads and drive measurable results.',
    },
    fullDescription: {
      es: 'Diseñamos y desarrollamos landing pages de alto impacto, optimizadas para SEO y conversión. Cada página está estratégicamente pensada para guiar a tus visitantes hacia la acción deseada.',
      en: 'We design and build high-impact landing pages optimized for SEO and conversion. Every page is strategically crafted to guide visitors toward the action you want them to take.',
    },
    icon: 'rocket',
    features: {
      es: [
        'Diseño responsive y moderno',
        'Optimización SEO on-page',
        'Integración con herramientas de analytics',
        'Formularios de contacto optimizados',
        'Velocidad de carga optimizada',
        'Preparadas para A/B testing',
      ],
      en: [
        'Modern responsive design',
        'On-page SEO optimization',
        'Analytics integrations',
        'Conversion-oriented contact forms',
        'Performance-optimized load times',
        'Ready for A/B testing',
      ],
    },
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Vercel', icon: 'vercel' },
    ],
    benefits: {
      es: [
        {
          title: 'Mayor conversión',
          description: 'Diseño enfocado en convertir visitas en oportunidades reales.',
          icon: 'trending-up',
        },
        {
          title: 'SEO optimizado',
          description: 'Base técnica preparada para posicionamiento orgánico.',
          icon: 'search',
        },
        {
          title: 'Carga rápida',
          description: 'Mejor experiencia para usuarios y mejor performance general.',
          icon: 'zap',
        },
      ],
      en: [
        {
          title: 'Higher conversion',
          description: 'A design approach built to turn visits into qualified leads.',
          icon: 'trending-up',
        },
        {
          title: 'SEO ready',
          description: 'A technical foundation prepared for organic visibility.',
          icon: 'search',
        },
        {
          title: 'Fast loading',
          description: 'A better user experience with stronger overall performance.',
          icon: 'zap',
        },
      ],
    },
    cta: {
      text: {
        es: 'Solicitar presupuesto',
        en: 'Request a quote',
      },
      href: '/contacto?servicio=landing-pages',
    },
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: {
      es: 'E-commerce',
      en: 'E-commerce',
    },
    shortDescription: {
      es: 'Tiendas online completas y escalables que impulsan tus ventas.',
      en: 'Complete, scalable online stores designed to grow your sales.',
    },
    fullDescription: {
      es: 'Desarrollamos plataformas de comercio electrónico robustas y escalables, con las funcionalidades necesarias para gestionar tu negocio online de manera eficiente.',
      en: 'We build robust, scalable e-commerce platforms with the features your team needs to run and grow your online business efficiently.',
    },
    icon: 'shopping-cart',
    features: {
      es: [
        'Catálogo de productos flexible',
        'Carrito de compras optimizado',
        'Múltiples métodos de pago',
        'Gestión de inventario',
        'Panel de administración intuitivo',
        'Integración con sistemas de envío',
        'Reportes y analytics',
      ],
      en: [
        'Flexible product catalog',
        'Optimized shopping cart',
        'Multiple payment methods',
        'Inventory management',
        'Intuitive admin panel',
        'Shipping integrations',
        'Reporting and analytics',
      ],
    },
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: '.NET Core', icon: 'dotnet' },
      { name: 'SQL Server', icon: 'database' },
      { name: 'Stripe', icon: 'credit-card' },
      { name: 'MercadoPago', icon: 'credit-card' },
    ],
    benefits: {
      es: [
        {
          title: 'Ventas 24/7',
          description: 'Tu tienda sigue vendiendo incluso fuera del horario comercial.',
          icon: 'clock',
        },
        {
          title: 'Escalabilidad',
          description: 'Arquitectura lista para crecer junto con tu operación.',
          icon: 'layers',
        },
        {
          title: 'Control total',
          description: 'Gestión centralizada de catálogo, pagos y pedidos.',
          icon: 'settings',
        },
      ],
      en: [
        {
          title: '24/7 sales',
          description: 'Your store keeps selling even when your team is offline.',
          icon: 'clock',
        },
        {
          title: 'Scalability',
          description: 'An architecture prepared to grow with your operation.',
          icon: 'layers',
        },
        {
          title: 'Full control',
          description: 'Centralized management for catalog, payments and orders.',
          icon: 'settings',
        },
      ],
    },
    cta: {
      text: {
        es: 'Crear mi tienda',
        en: 'Build my store',
      },
      href: '/contacto?servicio=ecommerce',
    },
  },
  {
    id: 'desarrollo-medida',
    slug: 'desarrollo-a-medida',
    title: {
      es: 'Desarrollo a Medida',
      en: 'Custom Development',
    },
    shortDescription: {
      es: 'Software personalizado que se adapta a los procesos reales de tu negocio.',
      en: 'Custom software tailored to the real workflows and needs of your business.',
    },
    fullDescription: {
      es: 'Creamos soluciones de software únicas, diseñadas específicamente para resolver los desafíos particulares de tu organización. Desde aplicaciones web hasta sistemas empresariales complejos.',
      en: 'We build unique software solutions designed to solve the specific challenges of your organization, from web apps to complex business systems.',
    },
    icon: 'code',
    features: {
      es: [
        'Análisis de requerimientos detallado',
        'Arquitectura escalable y mantenible',
        'Desarrollo ágil con entregas incrementales',
        'Testing automatizado',
        'Documentación técnica completa',
        'Soporte y mantenimiento continuo',
      ],
      en: [
        'Detailed requirements discovery',
        'Scalable and maintainable architecture',
        'Agile development with incremental deliveries',
        'Automated testing',
        'Complete technical documentation',
        'Ongoing support and maintenance',
      ],
    },
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: '.NET Core', icon: 'dotnet' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Azure', icon: 'cloud' },
    ],
    benefits: {
      es: [
        {
          title: 'Solución única',
          description: 'Software alineado con tus procesos y objetivos específicos.',
          icon: 'puzzle',
        },
        {
          title: 'Integración total',
          description: 'Conexión con sistemas existentes sin fricciones innecesarias.',
          icon: 'link',
        },
        {
          title: 'Propiedad completa',
          description: 'La solución queda bajo tu control, sin dependencia de terceros.',
          icon: 'shield',
        },
      ],
      en: [
        {
          title: 'Tailored solution',
          description: 'Software aligned with your exact processes and business goals.',
          icon: 'puzzle',
        },
        {
          title: 'Full integration',
          description: 'Works with your existing systems without unnecessary friction.',
          icon: 'link',
        },
        {
          title: 'Full ownership',
          description: 'You keep control of the solution without third-party lock-in.',
          icon: 'shield',
        },
      ],
    },
    cta: {
      text: {
        es: 'Agendar consulta',
        en: 'Book a consultation',
      },
      href: '/contacto?servicio=desarrollo-medida',
    },
  },
  {
    id: 'consultoria',
    slug: 'consultoria',
    title: {
      es: 'Consultoría',
      en: 'Consulting',
    },
    shortDescription: {
      es: 'Asesoramiento experto en arquitectura de software y mejores prácticas de desarrollo.',
      en: 'Expert guidance on software architecture, delivery processes and engineering best practices.',
    },
    fullDescription: {
      es: 'Ofrecemos consultoría especializada para optimizar procesos de desarrollo, mejorar la arquitectura de tus sistemas y fortalecer a tu equipo con mejores prácticas.',
      en: 'We provide consulting to optimize delivery processes, improve system architecture and strengthen your team with better engineering practices.',
    },
    icon: 'lightbulb',
    features: {
      es: [
        'Auditoría de código y arquitectura',
        'Definición de stack tecnológico',
        'Implementación de CI/CD',
        'Capacitación en mejores prácticas',
        'Code review y mentoring',
        'Migración de sistemas legacy',
      ],
      en: [
        'Code and architecture audits',
        'Technology stack definition',
        'CI/CD implementation',
        'Best practices training',
        'Code review and mentoring',
        'Legacy migration support',
      ],
    },
    technologies: [
      { name: 'Clean Architecture', icon: 'layers' },
      { name: 'SOLID', icon: 'check-circle' },
      { name: 'DDD', icon: 'grid' },
      { name: 'DevOps', icon: 'refresh-cw' },
      { name: 'Agile', icon: 'users' },
    ],
    benefits: {
      es: [
        {
          title: 'Experiencia probada',
          description: 'Acompañamiento basado en experiencias reales de implementación.',
          icon: 'award',
        },
        {
          title: 'Mejores prácticas',
          description: 'Estándares técnicos que reducen deuda y mejoran calidad.',
          icon: 'check-square',
        },
        {
          title: 'Transferencia de conocimiento',
          description: 'Tu equipo gana criterio, autonomía y mejores procesos.',
          icon: 'book-open',
        },
      ],
      en: [
        {
          title: 'Proven experience',
          description: 'Hands-on guidance grounded in real implementation work.',
          icon: 'award',
        },
        {
          title: 'Better practices',
          description: 'Engineering standards that reduce debt and improve quality.',
          icon: 'check-square',
        },
        {
          title: 'Knowledge transfer',
          description: 'Your team gains stronger judgment, autonomy and process quality.',
          icon: 'book-open',
        },
      ],
    },
    cta: {
      text: {
        es: 'Solicitar consultoría',
        en: 'Request consulting',
      },
      href: '/contacto?servicio=consultoria',
    },
  },
] as const;

const mapService = (service: LocalizedService, language: AppLanguage): Service => ({
  id: service.id,
  slug: service.slug,
  title: service.title[language],
  shortDescription: service.shortDescription[language],
  fullDescription: service.fullDescription[language],
  icon: service.icon,
  features: service.features[language],
  technologies: service.technologies,
  benefits: service.benefits[language],
  cta: {
    text: service.cta.text[language],
    href: service.cta.href,
  },
});

export const getServices = (language: AppLanguage): readonly Service[] =>
  LOCALIZED_SERVICES.map((service) => mapService(service, language));

export const getFeaturedServices = (language: AppLanguage, count = 5): readonly Service[] =>
  getServices(language).slice(0, count);

export const getServiceBySlug = (slug: string, language: AppLanguage): Service | undefined => {
  const service = LOCALIZED_SERVICES.find((item) => item.slug === slug);
  return service ? mapService(service, language) : undefined;
};
