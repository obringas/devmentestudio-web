import { AppLanguage } from '../core/services/locale.service';

export type HeroContent = {
  readonly availability: string;
  readonly titleStart: string;
  readonly titleAccent: string;
  readonly titleEnd: string;
  readonly description: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly tags: readonly string[];
  readonly metrics: readonly { readonly value: string; readonly label: string }[];
  readonly reelTitle: string;
  readonly reelSubtitle: string;
  readonly reelChip: string;
  readonly reelPill: string;
  readonly floatingA: { readonly title: string; readonly subtitle: string };
  readonly floatingB: { readonly title: string; readonly subtitle: string };
  readonly reelFooterEyebrow: string;
  readonly reelFooterText: string;
  readonly experienceCard: { readonly label: string; readonly title: string; readonly description: string };
  readonly techCard: { readonly label: string; readonly title: string; readonly description: string };
};

export type ServicesPreviewContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly allServices: string;
  readonly techLabel: string;
  readonly explore: string;
  readonly pillars: readonly { readonly label: string; readonly title: string; readonly description: string }[];
};

export type TechStackContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly sideNote: string;
  readonly workflowEyebrow: string;
  readonly workflowTitle: string;
  readonly steps: readonly { readonly label: string; readonly title: string; readonly description: string }[];
  readonly coverageEyebrow: string;
  readonly coverageTech: string;
  readonly coverageAreas: string;
};

export type CtaSectionContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly cards: readonly { readonly label: string; readonly title: string; readonly description: string }[];
};

const HERO_CONTENT: Record<AppLanguage, HeroContent> = {
  en: {
    availability: 'Available for new projects in 2026',
    titleStart: 'Your business can look',
    titleAccent: 'premium',
    titleEnd: 'from the very first visit.',
    description:
      'We design websites, experiences and custom software with strong visual direction, real performance and a clear business focus. Less generic template. More brand presence, trust and conversion.',
    primaryCta: 'Upgrade my website',
    secondaryCta: 'See work and approach',
    tags: ['Real SSR and SEO', 'Commercial-grade UI', 'Angular, .NET, Node and cloud'],
    metrics: [
      { value: '50+', label: 'deliveries across websites, e-commerce and systems.' },
      { value: '3 layers', label: 'brand, product and technology aligned in one proposal.' },
      { value: '24 hrs', label: 'for an initial response and scope review.' },
    ],
    reelTitle: 'Studio reel',
    reelSubtitle: 'frontend-generated motion preview',
    reelChip: 'silent autoplay',
    reelPill: 'Brand systems',
    floatingA: {
      title: 'UI direction',
      subtitle: 'clarity + conversion',
    },
    floatingB: {
      title: 'SSR build',
      subtitle: 'fast, stable, premium',
    },
    reelFooterEyebrow: 'Dynamic reel',
    reelFooterText: 'If you want, I can later replace this with a real MP4 video in the same style.',
    experienceCard: {
      label: 'Experience',
      title: 'Sharper interfaces',
      description: 'Less decoration. More clarity, pacing and intentional visual hierarchy.',
    },
    techCard: {
      label: 'Technology',
      title: 'SSR + performance',
      description: 'Strong design without sacrificing speed, SEO or maintainability.',
    },
  },
  es: {
    availability: 'Disponible para nuevos proyectos 2026',
    titleStart: 'Tu negocio puede verse',
    titleAccent: 'premium',
    titleEnd: 'desde la primera visita.',
    description:
      'Disenamos sitios, experiencias y software a medida con criterio visual, performance real y foco comercial. Menos template generico. Mas presencia de marca, confianza y conversion.',
    primaryCta: 'Quiero elevar mi sitio',
    secondaryCta: 'Ver trabajos y enfoque',
    tags: ['SSR y SEO real', 'UI con criterio comercial', 'Angular, .NET, Node y cloud'],
    metrics: [
      { value: '50+', label: 'entregas entre sitios, e-commerce y sistemas.' },
      { value: '3 capas', label: 'marca, producto y tecnologia alineadas en una sola propuesta.' },
      { value: '24 hs', label: 'de respuesta inicial para evaluar el alcance del proyecto.' },
    ],
    reelTitle: 'Reel del estudio',
    reelSubtitle: 'motion preview generado en frontend',
    reelChip: 'autoplay silencioso',
    reelPill: 'Sistemas de marca',
    floatingA: {
      title: 'Direccion UI',
      subtitle: 'claridad + conversion',
    },
    floatingB: {
      title: 'Build SSR',
      subtitle: 'rapido, estable, premium',
    },
    reelFooterEyebrow: 'Reel dinamico',
    reelFooterText: 'Si queres, despues de esto puedo reemplazarlo por un video MP4 real del mismo estilo.',
    experienceCard: {
      label: 'Experiencia',
      title: 'Interfaces sobrias',
      description: 'Menos artificio. Mas claridad, ritmo y jerarquia visual.',
    },
    techCard: {
      label: 'Tecnologia',
      title: 'SSR + performance',
      description: 'Diseno potente sin descuidar carga, SEO ni mantenibilidad.',
    },
  },
};

const SERVICES_PREVIEW_CONTENT: Record<AppLanguage, ServicesPreviewContent> = {
  en: {
    eyebrow: 'Core services',
    title: 'A strong visual proposal means nothing if the product is not well solved.',
    description:
      'We combine design direction, architecture and execution so the site looks great, loads fast and converts.',
    allServices: 'See full scope',
    techLabel: 'technologies',
    explore: 'Explore service',
    pillars: [
      {
        label: 'Design',
        title: 'Identity and hierarchy',
        description: 'Every screen should communicate a serious brand, not a disposable template.',
      },
      {
        label: 'Code',
        title: 'Maintainable components',
        description: 'Expressive UI without losing structure, performance or room to evolve.',
      },
      {
        label: 'Business',
        title: 'Messaging that converts',
        description: 'Content and layout should sell before the first call even starts.',
      },
    ],
  },
  es: {
    eyebrow: 'Servicios principales',
    title: 'Una propuesta visual fuerte no sirve si el producto no esta bien resuelto.',
    description:
      'Combinamos direccion de diseno, arquitectura y ejecucion para que el sitio guste, cargue bien y convierta.',
    allServices: 'Ver alcance completo',
    techLabel: 'tecnologias',
    explore: 'Explorar servicio',
    pillars: [
      {
        label: 'Diseno',
        title: 'Identidad y jerarquia',
        description: 'Cada pantalla debe comunicar una marca seria, no una plantilla intercambiable.',
      },
      {
        label: 'Codigo',
        title: 'Componentes mantenibles',
        description: 'UI expresiva sin perder orden estructural, performance ni capacidad de evolucion.',
      },
      {
        label: 'Negocio',
        title: 'Mensajes que convierten',
        description: 'El contenido y la disposicion ayudan a vender antes de que empiece la reunion.',
      },
    ],
  },
};

const TECH_STACK_CONTENT: Record<AppLanguage, TechStackContent> = {
  en: {
    eyebrow: 'Technical system',
    title: 'Good design only works when it stands on top of well-chosen technology.',
    description:
      'We do not pick tools because they are trendy. We build stacks that fit the business, the team and the expected growth.',
    sideNote: 'Architecture, frontend, backend, data and deployment treated as one product experience.',
    workflowEyebrow: 'How we work',
    workflowTitle: 'Design with a product mindset. Code with a systems mindset.',
    steps: [
      { label: '01 Discovery', title: 'Discovery', description: 'We define the message, value proposition, user journey and visual priorities.' },
      { label: '02 Build', title: 'Build', description: 'We develop components, pages and backend with clarity, conversion and maintainability in mind.' },
      { label: '03 Delivery', title: 'Delivery', description: 'We validate performance, responsiveness, SEO and the final experience before launch.' },
    ],
    coverageEyebrow: 'Current coverage',
    coverageTech: 'active stack tools',
    coverageAreas: 'coordinated areas',
  },
  es: {
    eyebrow: 'Sistema tecnico',
    title: 'El buen diseno se sostiene con tecnologia elegida con criterio.',
    description:
      'No elegimos herramientas por moda. Armamos stacks coherentes con el negocio, el equipo y el crecimiento esperado.',
    sideNote: 'Arquitectura, frontend, backend, datos y deploy pensados como una sola experiencia de producto.',
    workflowEyebrow: 'Como trabajamos',
    workflowTitle: 'Diseno con mentalidad de producto. Codigo con mentalidad de sistema.',
    steps: [
      { label: '01 Descubrimiento', title: 'Descubrimiento', description: 'Definimos mensaje, propuesta de valor, recorrido del usuario y prioridades visuales.' },
      { label: '02 Construccion', title: 'Construccion', description: 'Desarrollamos componentes, paginas y backend con foco en claridad, conversion y mantenibilidad.' },
      { label: '03 Entrega', title: 'Entrega', description: 'Validamos performance, responsive, SEO y experiencia final antes de publicar.' },
    ],
    coverageEyebrow: 'Cobertura actual',
    coverageTech: 'herramientas en stack activo',
    coverageAreas: 'frentes coordinados',
  },
};

const CTA_SECTION_CONTENT: Record<AppLanguage, CtaSectionContent> = {
  en: {
    eyebrow: 'Next step',
    title: "If you want a website people actually enjoy, let's start with the right direction.",
    description:
      'We can redesign your digital presence, sharpen the message, elevate the UI and leave you with a technical foundation that can grow without a full rebuild six months later.',
    primaryCta: 'I want a proposal',
    secondaryCta: 'Direct WhatsApp',
    cards: [
      {
        label: 'Delivery',
        title: 'First visual direction',
        description: 'We define references, tone, hierarchy and structure so the site stops looking generic.',
      },
      {
        label: 'Execution',
        title: 'Professional, consistent UI',
        description: 'Composition, spacing, typography and components designed like a system, not isolated blocks.',
      },
      {
        label: 'Scalability',
        title: 'Ready for a real video layer',
        description: 'The hero can evolve into a local MP4 reel later without redoing the layout or hurting performance.',
      },
    ],
  },
  es: {
    eyebrow: 'Siguiente paso',
    title: 'Si queres una pagina que guste de verdad, empecemos por la direccion correcta.',
    description:
      'Podemos redisenar tu presencia digital, mejorar el mensaje, elevar la UI y dejar una base tecnica solida para crecer sin rehacer todo en seis meses.',
    primaryCta: 'Quiero una propuesta',
    secondaryCta: 'WhatsApp directo',
    cards: [
      {
        label: 'Entrega',
        title: 'Primer direccionamiento visual',
        description: 'Aterrizamos referencias, tono, jerarquia y estructura para que el sitio deje de verse generico.',
      },
      {
        label: 'Ejecucion',
        title: 'UI profesional y consistente',
        description: 'Composicion, espaciado, tipografia y componentes pensados como sistema, no como bloques sueltos.',
      },
      {
        label: 'Escalabilidad',
        title: 'Base lista para sumar video real',
        description: 'El hero puede evolucionar a un reel MP4 local sin rehacer el layout ni romper performance.',
      },
    ],
  },
};

export const getHeroContent = (language: AppLanguage): HeroContent => HERO_CONTENT[language];
export const getServicesPreviewContent = (language: AppLanguage): ServicesPreviewContent => SERVICES_PREVIEW_CONTENT[language];
export const getTechStackContent = (language: AppLanguage): TechStackContent => TECH_STACK_CONTENT[language];
export const getCtaSectionContent = (language: AppLanguage): CtaSectionContent => CTA_SECTION_CONTENT[language];
