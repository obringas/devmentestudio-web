import { Service } from '../models';

export const SERVICES: readonly Service[] = [
  {
    id: 'landing-pages',
    slug: 'landing-pages',
    title: 'Landing Pages',
    shortDescription: 'Páginas de aterrizaje optimizadas para conversión que capturan leads y generan resultados.',
    fullDescription: 'Diseñamos y desarrollamos landing pages de alto impacto, optimizadas para SEO y conversión. Cada página está estratégicamente diseñada para guiar a tus visitantes hacia la acción deseada.',
    icon: 'rocket',
    features: [
      'Diseño responsive y moderno',
      'Optimización SEO on-page',
      'Integración con herramientas de analytics',
      'Formularios de contacto optimizados',
      'Velocidad de carga optimizada',
      'A/B testing ready',
    ],
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Vercel', icon: 'vercel' },
    ],
    benefits: [
      {
        title: 'Mayor Conversión',
        description: 'Diseño enfocado en convertir visitantes en clientes potenciales.',
        icon: 'trending-up',
      },
      {
        title: 'SEO Optimizado',
        description: 'Posicionamiento orgánico desde el día uno.',
        icon: 'search',
      },
      {
        title: 'Carga Rápida',
        description: 'Performance optimizado para mejor experiencia de usuario.',
        icon: 'zap',
      },
    ],
    cta: {
      text: 'Solicitar Presupuesto',
      href: '/contacto?servicio=landing-pages',
    },
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-commerce',
    shortDescription: 'Tiendas online completas y escalables que impulsan tus ventas.',
    fullDescription: 'Desarrollamos plataformas de comercio electrónico robustas y escalables, con todas las funcionalidades necesarias para gestionar tu negocio online de manera eficiente.',
    icon: 'shopping-cart',
    features: [
      'Catálogo de productos flexible',
      'Carrito de compras optimizado',
      'Múltiples métodos de pago',
      'Gestión de inventario',
      'Panel de administración intuitivo',
      'Integración con sistemas de envío',
      'Reportes y analytics',
    ],
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: '.NET Core', icon: 'dotnet' },
      { name: 'SQL Server', icon: 'database' },
      { name: 'Stripe', icon: 'credit-card' },
      { name: 'MercadoPago', icon: 'credit-card' },
    ],
    benefits: [
      {
        title: 'Ventas 24/7',
        description: 'Tu tienda nunca cierra, vende mientras duermes.',
        icon: 'clock',
      },
      {
        title: 'Escalabilidad',
        description: 'Crece sin límites con arquitectura preparada para el futuro.',
        icon: 'layers',
      },
      {
        title: 'Control Total',
        description: 'Administra todo desde un panel centralizado.',
        icon: 'settings',
      },
    ],
    cta: {
      text: 'Crear Mi Tienda',
      href: '/contacto?servicio=ecommerce',
    },
  },
  {
    id: 'desarrollo-medida',
    slug: 'desarrollo-a-medida',
    title: 'Desarrollo a Medida',
    shortDescription: 'Software personalizado que se adapta perfectamente a los procesos de tu negocio.',
    fullDescription: 'Creamos soluciones de software únicas, diseñadas específicamente para resolver los desafíos particulares de tu organización. Desde aplicaciones web hasta sistemas empresariales complejos.',
    icon: 'code',
    features: [
      'Análisis de requerimientos detallado',
      'Arquitectura escalable y mantenible',
      'Desarrollo ágil con entregas incrementales',
      'Testing automatizado',
      'Documentación técnica completa',
      'Soporte y mantenimiento continuo',
    ],
    technologies: [
      { name: 'Angular', icon: 'angular' },
      { name: '.NET Core', icon: 'dotnet' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Azure', icon: 'cloud' },
    ],
    benefits: [
      {
        title: 'Solución Única',
        description: 'Software hecho a medida de tus necesidades específicas.',
        icon: 'puzzle',
      },
      {
        title: 'Integración Total',
        description: 'Se conecta con tus sistemas existentes sin fricciones.',
        icon: 'link',
      },
      {
        title: 'Propiedad Completa',
        description: 'El código es tuyo, sin dependencias de terceros.',
        icon: 'shield',
      },
    ],
    cta: {
      text: 'Agendar Consulta',
      href: '/contacto?servicio=desarrollo-medida',
    },
  },
  {
    id: 'consultoria',
    slug: 'consultoria',
    title: 'Consultoría',
    shortDescription: 'Asesoramiento experto en arquitectura de software y mejores prácticas de desarrollo.',
    fullDescription: 'Ofrecemos consultoría especializada para optimizar tus procesos de desarrollo, mejorar la arquitectura de tus sistemas y capacitar a tu equipo en las mejores prácticas de la industria.',
    icon: 'lightbulb',
    features: [
      'Auditoría de código y arquitectura',
      'Definición de stack tecnológico',
      'Implementación de CI/CD',
      'Capacitación en mejores prácticas',
      'Code review y mentoring',
      'Migración de sistemas legacy',
    ],
    technologies: [
      { name: 'Clean Architecture', icon: 'layers' },
      { name: 'SOLID', icon: 'check-circle' },
      { name: 'DDD', icon: 'grid' },
      { name: 'DevOps', icon: 'refresh-cw' },
      { name: 'Agile', icon: 'users' },
    ],
    benefits: [
      {
        title: 'Experiencia Probada',
        description: 'Años de experiencia en proyectos de diversa escala.',
        icon: 'award',
      },
      {
        title: 'Mejores Prácticas',
        description: 'Implementación de estándares de la industria.',
        icon: 'check-square',
      },
      {
        title: 'Transferencia de Conocimiento',
        description: 'Tu equipo aprende y crece con nosotros.',
        icon: 'book-open',
      },
    ],
    cta: {
      text: 'Solicitar Consultoría',
      href: '/contacto?servicio=consultoria',
    },
  },
] as const;

export const getFeaturedServices = (count: number = 4): readonly Service[] => 
  SERVICES.slice(0, count);

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find(service => service.slug === slug);
