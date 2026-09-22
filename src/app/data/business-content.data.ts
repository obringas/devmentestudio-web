import { AppLanguage } from '../core/services/locale.service';

export interface ContentItem {
  readonly title: string;
  readonly description: string;
}

export interface ServiceItem extends ContentItem {
  readonly slug: string;
  readonly specialty?: boolean;
}

export interface TechnicalGroup {
  readonly title: string;
  readonly description: string;
}

export interface BusinessContent {
  readonly homeHero: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly modernizationHero: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly trust: readonly string[];
  readonly signals: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly ContentItem[];
    readonly extraItems: readonly ContentItem[];
    readonly close: string;
    readonly closeLink: string;
  };
  readonly outcomes: {
    readonly title: string;
    readonly items: readonly ContentItem[];
  };
  readonly services: {
    readonly title: string;
    readonly intro: string;
    readonly specialtyLabel: string;
    readonly cta: string;
    readonly detailsCta: string;
    readonly items: readonly ServiceItem[];
  };
  readonly process: {
    readonly title: string;
    readonly subtitle: string;
    readonly items: readonly ContentItem[];
  };
  readonly portfolio: {
    readonly title: string;
    readonly link: string;
    readonly situationLabel: string;
    readonly resultLabel: string;
  };
  readonly person: {
    readonly title: string;
    readonly body: string;
    readonly link: string;
    readonly photoPending: string;
  };
  readonly technical: {
    readonly title: string;
    readonly intro: string;
    readonly expand: string;
    readonly groups: readonly TechnicalGroup[];
  };
  readonly faq: {
    readonly title: string;
    readonly items: readonly ContentItem[];
  };
  readonly closing: {
    readonly title: string;
    readonly text: string;
    readonly primaryCta: string;
    readonly whatsappCta: string;
  };
  readonly modernizationServices: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly ServiceItem[];
  };
}

const ES_CONTENT: BusinessContent = {
  homeHero: {
    label: 'SISTEMAS DE GESTIÓN PARA EMPRESAS QUE NO PUEDEN PARAR',
    title: 'Tu empresa funciona sobre un sistema que nadie quiere tocar.',
    description:
      'Modernizamos sistemas de gestión viejos por partes, sin frenar la operación ni un día. Y cuando hace falta, construimos lo nuevo: software a medida, sitios y tiendas online.',
    primaryCta: 'Quiero saber cómo está mi sistema',
    secondaryCta: 'Ver cómo trabajamos',
  },
  modernizationHero: {
    label: 'MODERNIZACIÓN DE SISTEMAS DE GESTIÓN',
    title: 'El sistema que maneja tu empresa tiene 20 años y una sola persona lo entiende.',
    description:
      'Cuando el sistema que factura, liquida y controla tu operación depende de un programa viejo y de alguien que puede no estar mañana, el problema dejó de ser técnico. Lo modernizamos por partes, sin frenar la operación ni un día, y con vuelta atrás en cada paso.',
    primaryCta: 'Quiero saber cómo está mi sistema',
    secondaryCta: 'Hablar por WhatsApp',
  },
  trust: [
    '20 años de experiencia',
    '50+ proyectos entregados',
    'Sistemas en producción hoy',
    'Respuesta en 24 horas hábiles',
  ],
  signals: {
    title: '¿Te suena?',
    intro: 'Si reconocés dos o más de estas, el problema ya dejó de ser técnico.',
    items: [
      {
        title: 'Una sola persona entiende el sistema.',
        description: 'Si se va, se enferma o se jubila, la empresa queda expuesta.',
      },
      {
        title: 'Cada cambio de ARCA es una urgencia.',
        description: 'Facturar depende de un parche de último momento.',
      },
      {
        title: 'Nadie quiere tocarlo.',
        description: 'Los pedidos del negocio se acumulan porque modificar el sistema da miedo.',
      },
      {
        title: 'No hay respaldo probado.',
        description: 'Se prueba en producción y se cruzan los dedos.',
      },
    ],
    extraItems: [
      {
        title: 'La información vive en archivos sueltos o planillas paralelas.',
        description: 'Consultar o cruzar datos depende de procesos manuales difíciles de controlar.',
      },
      {
        title: 'El proveedor original ya no está.',
        description: 'O mantiene el sistema sin una forma clara de hacerlo evolucionar.',
      },
    ],
    close:
      'No hace falta tirar todo y empezar de cero. Hay un camino más corto y menos riesgoso.',
    closeLink: 'Ver cómo',
  },
  outcomes: {
    title: 'Lo que cambia para tu empresa',
    items: [
      {
        title: 'Dejás de depender de una sola persona.',
        description: 'El sistema queda documentado y en una tecnología que cualquier equipo puede mantener.',
      },
      {
        title: 'Facturás aunque ARCA cambie.',
        description: 'Los cambios normativos se resuelven en un solo lugar, no a los apurones.',
      },
      {
        title: 'Sabés qué hay adentro.',
        description: 'Reglas de negocio relevadas y escritas, no en la cabeza de alguien.',
      },
      {
        title: 'Cambiás lo que hace falta, cuando hace falta.',
        description: 'Por partes, con vuelta atrás. Nunca un salto al vacío.',
      },
    ],
  },
  services: {
    title: 'Qué hacemos',
    intro: 'Empezamos siempre por entender qué tenés. Después, lo que tu empresa necesite.',
    specialtyLabel: 'Especialidad',
    cta: 'Consultar',
    detailsCta: 'Ver modernización',
    items: [
      {
        slug: 'modernizacion',
        specialty: true,
        title: 'Modernización de sistemas de gestión',
        description:
          'Tu sistema actual sigue funcionando mientras construimos el nuevo al lado. Se reemplaza por partes, empezando por lo de menor riesgo, y cada paso se puede deshacer.',
      },
      {
        slug: 'diagnostico-continuidad',
        specialty: true,
        title: 'Diagnóstico de continuidad',
        description:
          'Un informe claro de qué riesgos tiene tu sistema, qué conviene tocar primero y cuánto cuesta. Con alcance y precio cerrados. Te sirve aunque después no sigamos juntos.',
      },
      {
        slug: 'facturacion-arca',
        title: 'Facturación electrónica y ARCA',
        description:
          'Que facturar no dependa de un parche de último momento. Integramos tu sistema actual, aunque sea viejo, con los servicios de ARCA.',
      },
      {
        slug: 'datos-seguros',
        title: 'Datos seguros y disponibles',
        description:
          'Copias de respaldo verificadas, información accesible desde donde la necesites y monitoreo que avisa antes de que algo falle.',
      },
      {
        slug: 'desarrollo-a-medida',
        title: 'Software a medida',
        description:
          'Cuando lo que necesitás no existe, lo construimos sobre los procesos reales de tu empresa.',
      },
      {
        slug: 'sitios-tiendas',
        title: 'Sitios y tiendas online',
        description: 'Presencia digital seria, rápida y pensada para vender. Sin plantillas genéricas.',
      },
    ],
  },
  process: {
    title: 'Cómo trabajamos',
    subtitle: 'Primero entender. Después asegurar. Recién entonces cambiar.',
    items: [
      {
        title: 'Entender',
        description:
          'Relevamos qué hace tu sistema hoy y por qué. Las reglas que nadie documentó son las que más importan.',
      },
      {
        title: 'Asegurar',
        description:
          'Antes de tocar nada: respaldos probados y un ambiente de pruebas real. Nada se prueba en producción.',
      },
      {
        title: 'Reemplazar por partes',
        description:
          'El sistema viejo y el nuevo conviven y comparten datos. Cambiamos un módulo a la vez, empezando por el de menor riesgo.',
      },
      {
        title: 'Dejar documentado',
        description:
          'El objetivo es que no dependas de nosotros. Todo queda escrito y en una tecnología que cualquier equipo puede seguir.',
      },
    ],
  },
  portfolio: {
    title: 'Trabajo real, en producción',
    link: 'Ver todos los casos',
    situationLabel: 'Situación',
    resultLabel: 'Qué cambió',
  },
  person: {
    title: 'Detrás de DevMenteStudio hay una persona con nombre',
    body:
      'Soy Oscar Bringas, ingeniero en sistemas de información (UTN). Hace más de 15 años lidero equipos de desarrollo y hace 20 trabajo con las bases de datos que sostienen empresas reales. Hoy estoy a cargo de los sistemas de una cooperativa agroindustrial del norte argentino, donde conviven a diario un sistema histórico y una plataforma moderna. La modernización gradual no es una metodología que leí: es la que ejecuto todos los días sobre un sistema del que depende una empresa.',
    link: 'Conocer más',
    photoPending: 'Retrato de Oscar · foto definitiva pendiente',
  },
  technical: {
    title: 'Para tu equipo de sistemas',
    intro: 'Si sos la persona técnica a la que le reenviaron este link, acá está el detalle.',
    expand: 'Ver detalle técnico',
    groups: [
      {
        title: 'Stack',
        description:
          '.NET 8, C#, Angular, Blazor, Next.js, SQL Server, PostgreSQL, Azure (Entra ID, Data Factory, DevOps) y Docker.',
      },
      {
        title: 'Legacy que trabajamos',
        description:
          'Visual FoxPro, Visual Basic 6, Clipper y sistemas de escritorio con archivos DBF.',
      },
      {
        title: 'Método',
        description:
          'Convivencia legacy/.NET sobre la misma base de datos; migración DBF a SQL Server con verificación; reescritura por módulos con Clean Architecture; replicación transaccional hacia Azure con monitoreo; integración con webservices de ARCA; despliegues graduales y reversibles.',
      },
      {
        title: 'Cómo entregamos',
        description:
          'Repositorio con historial limpio, documentación de arquitectura y reglas de negocio, ambientes separados y pruebas automatizadas donde aportan valor.',
      },
    ],
  },
  faq: {
    title: 'Preguntas que nos hacen siempre',
    items: [
      {
        title: '¿Tengo que cambiar todo de golpe?',
        description:
          'No. Justamente evitamos eso. El sistema actual sigue funcionando mientras el nuevo crece al lado, y se reemplaza por partes.',
      },
      {
        title: '¿Qué pasa con mis datos?',
        description:
          'Se migran con verificación y respaldo previo. Nada se borra ni se pierde en el camino; el sistema viejo y el nuevo comparten la misma información durante la transición.',
      },
      {
        title: '¿Cuánto tarda?',
        description:
          'Depende del sistema. Por eso empezamos con un diagnóstico de alcance y precio cerrados, que te dice qué conviene hacer primero y en cuánto tiempo.',
      },
      {
        title: '¿Cuánto cuesta?',
        description:
          'El diagnóstico tiene precio fijo, acordado antes de empezar. Los proyectos de modernización se cotizan por etapas, con alcance definido, sin sorpresas.',
      },
      {
        title: '¿Trabajan a distancia?',
        description:
          'Sí, con toda la Argentina. Estamos en Salta y viajamos cuando el proyecto lo requiere.',
      },
      {
        title: '¿Y si mi sistema es muy viejo o muy raro?',
        description: 'Mejor. Es exactamente el tipo de sistema con el que trabajamos.',
      },
    ],
  },
  closing: {
    title: 'Empecemos por entender qué tenés, no por vender una reescritura.',
    text:
      'Contanos qué sistema usa tu empresa y en 24 horas hábiles te decimos cómo seguimos. Sin compromiso.',
    primaryCta: 'Quiero saber cómo está mi sistema',
    whatsappCta: 'Escribir por WhatsApp',
  },
  modernizationServices: {
    title: 'Servicios de modernización',
    intro: 'Cada etapa reduce un riesgo concreto y deja un resultado que tu empresa puede usar.',
    items: [
      {
        slug: 'diagnostico-continuidad',
        title: 'Diagnóstico de continuidad',
        description:
          'Relevamos el sistema, ordenamos los riesgos por impacto y proponemos un plan por etapas con alcance y precio cerrados.',
      },
      {
        slug: 'modernizacion',
        title: 'Modernización por partes',
        description:
          'El sistema actual y el nuevo conviven mientras reemplazamos módulos de menor a mayor riesgo, con vuelta atrás.',
      },
      {
        slug: 'datos-seguros',
        title: 'Datos seguros y disponibles',
        description:
          'Respaldos verificados, migraciones controladas, monitoreo y acceso seguro a la información que necesitás.',
      },
      {
        slug: 'facturacion-arca',
        title: 'Facturación electrónica y ARCA',
        description:
          'Integramos el sistema existente con los servicios fiscales y concentramos los cambios normativos en un solo lugar.',
      },
    ],
  },
};

const EN_CONTENT: BusinessContent = {
  homeHero: {
    label: 'MANAGEMENT SYSTEMS FOR BUSINESSES THAT CANNOT STOP',
    title: 'Your company runs on a system nobody wants to touch.',
    description:
      'We modernize aging management systems one part at a time, without stopping daily operations. When something new is needed, we also build custom software, websites and online stores.',
    primaryCta: 'Assess my current system',
    secondaryCta: 'See how we work',
  },
  modernizationHero: {
    label: 'MANAGEMENT SYSTEM MODERNIZATION',
    title: 'The system running your company is 20 years old and only one person understands it.',
    description:
      'When invoicing, settlements and daily operations depend on aging software and one person who may not be there tomorrow, the problem is no longer technical. We modernize it in stages, without stopping operations, with a way back at every step.',
    primaryCta: 'Assess my current system',
    secondaryCta: 'Talk on WhatsApp',
  },
  trust: [
    '20 years of experience',
    '50+ projects delivered',
    'Systems in production today',
    'Reply within 24 business hours',
  ],
  signals: {
    title: 'Does this sound familiar?',
    intro: 'If you recognize two or more of these signs, the problem is already bigger than technology.',
    items: [
      { title: 'Only one person understands the system.', description: 'If they leave, get sick or retire, the company is exposed.' },
      { title: 'Every ARCA change becomes an emergency.', description: 'Invoicing depends on a last-minute patch.' },
      { title: 'Nobody wants to touch it.', description: 'Business requests pile up because changing the system feels risky.' },
      { title: 'Backups have not been proven.', description: 'Changes are tested in production with fingers crossed.' },
    ],
    extraItems: [
      { title: 'Information lives in loose files or parallel spreadsheets.', description: 'Reporting and cross-checking depend on fragile manual work.' },
      { title: 'The original vendor is gone.', description: 'Or keeps the system alive without a clear path forward.' },
    ],
    close: 'You do not need to throw everything away and start over. There is a shorter, safer path.',
    closeLink: 'See how',
  },
  outcomes: {
    title: 'What changes for your company',
    items: [
      { title: 'You stop depending on one person.', description: 'The system is documented and built on technology another team can maintain.' },
      { title: 'You keep invoicing when ARCA changes.', description: 'Regulatory changes are handled in one place, without last-minute workarounds.' },
      { title: 'You know what is inside.', description: 'Business rules are discovered and written down instead of living in someone’s head.' },
      { title: 'You change what matters, when it matters.', description: 'One part at a time, with a way back. Never a leap into the unknown.' },
    ],
  },
  services: {
    title: 'What we do',
    intro: 'We always start by understanding what you have. Then we build what your company actually needs.',
    specialtyLabel: 'Specialty',
    cta: 'Start a conversation',
    detailsCta: 'See modernization',
    items: [
      { slug: 'modernizacion', specialty: true, title: 'Management system modernization', description: 'Your current system keeps working while we build the new one alongside it. We replace it in stages, starting with the lowest-risk area, and every step can be reversed.' },
      { slug: 'diagnostico-continuidad', specialty: true, title: 'Continuity assessment', description: 'A clear report covering system risks, what to address first and the expected cost. Fixed scope and price, useful even if we do not continue together.' },
      { slug: 'facturacion-arca', title: 'Electronic invoicing and ARCA', description: 'Invoicing should not depend on a last-minute patch. We connect your current system, however old, to ARCA services.' },
      { slug: 'datos-seguros', title: 'Secure, available data', description: 'Verified backups, information available where you need it and monitoring that warns you before a failure reaches users.' },
      { slug: 'desarrollo-a-medida', title: 'Custom software', description: 'When the right solution does not exist, we build it around the real processes of your company.' },
      { slug: 'sitios-tiendas', title: 'Websites and online stores', description: 'A serious, fast digital presence designed to sell, without generic templates.' },
    ],
  },
  process: {
    title: 'How we work',
    subtitle: 'Understand first. Secure next. Only then, change.',
    items: [
      { title: 'Understand', description: 'We map what your system does today and why. The rules nobody documented are usually the most important.' },
      { title: 'Secure', description: 'Before touching anything: proven backups and a real testing environment. Nothing is tested in production.' },
      { title: 'Replace in stages', description: 'The old and new systems coexist and share data. We change one module at a time, starting with the lowest risk.' },
      { title: 'Document everything', description: 'The goal is not dependence on us. Everything is written down and built so another qualified team can continue.' },
    ],
  },
  portfolio: { title: 'Real work, running in production', link: 'See every case', situationLabel: 'Situation', resultLabel: 'What changed' },
  person: {
    title: 'There is a real person behind DevMenteStudio',
    body: 'I am Oscar Bringas, Information Systems Engineer (UTN). I have led development teams for more than 15 years and worked for 20 years with the databases that keep real companies running. Today I lead the systems area of an agroindustrial cooperative in northern Argentina, where a historical system and a modern platform coexist every day. Gradual modernization is not a method I read about: it is what I carry out daily on a system an entire company depends on.',
    link: 'Learn more',
    photoPending: 'Oscar portrait · final photo pending',
  },
  technical: {
    title: 'For your systems team',
    intro: 'If you are the technical person this link was forwarded to, here is the detail.',
    expand: 'View technical detail',
    groups: [
      { title: 'Stack', description: '.NET 8, C#, Angular, Blazor, Next.js, SQL Server, PostgreSQL, Azure (Entra ID, Data Factory, DevOps) and Docker.' },
      { title: 'Legacy systems we work with', description: 'Visual FoxPro, Visual Basic 6, Clipper and desktop systems built around DBF files.' },
      { title: 'Method', description: 'Legacy/.NET coexistence over shared data; verified DBF to SQL Server migration; modular rewrites with Clean Architecture; monitored on-premise to Azure transactional replication; ARCA webservice integration; gradual, reversible deployments.' },
      { title: 'How we deliver', description: 'Repository with clean history, architecture and business-rule documentation, separate environments and automated tests where they add value.' },
    ],
  },
  faq: {
    title: 'Questions we hear all the time',
    items: [
      { title: 'Do I need to change everything at once?', description: 'No. That is exactly what we avoid. Your current system keeps running while the new one grows alongside it, one part at a time.' },
      { title: 'What happens to my data?', description: 'It is migrated with verification and a prior backup. Nothing is erased along the way; both systems share the same information during the transition.' },
      { title: 'How long does it take?', description: 'It depends on the system. We begin with a fixed-scope assessment that explains what should happen first and how long it is likely to take.' },
      { title: 'How much does it cost?', description: 'The assessment has a fixed price agreed in advance. Modernization projects are quoted by stage, with defined scope and no surprises.' },
      { title: 'Do you work remotely?', description: 'Yes, throughout Argentina. We are based in Salta and travel when a project requires it.' },
      { title: 'What if my system is extremely old or unusual?', description: 'Even better. That is exactly the kind of system we work with.' },
    ],
  },
  closing: {
    title: 'Let’s understand what you have before selling you a rewrite.',
    text: 'Tell us which system your company uses and within 24 business hours we will explain the next step. No obligation.',
    primaryCta: 'Assess my current system',
    whatsappCta: 'Write on WhatsApp',
  },
  modernizationServices: {
    title: 'Modernization services',
    intro: 'Every stage reduces a concrete risk and leaves your company with a usable result.',
    items: [
      { slug: 'diagnostico-continuidad', title: 'Continuity assessment', description: 'We map the system, rank risks by impact and propose a staged plan with fixed scope and price.' },
      { slug: 'modernizacion', title: 'Modernization in stages', description: 'The current and new systems coexist while we replace modules from lower to higher risk, with rollback at each step.' },
      { slug: 'datos-seguros', title: 'Secure, available data', description: 'Verified backups, controlled migrations, monitoring and safe access to the information you need.' },
      { slug: 'facturacion-arca', title: 'Electronic invoicing and ARCA', description: 'We connect existing systems to fiscal services and concentrate regulatory changes in one place.' },
    ],
  },
};

const CONTENT: Record<AppLanguage, BusinessContent> = {
  es: ES_CONTENT,
  en: EN_CONTENT,
};

export const getBusinessContent = (language: AppLanguage): BusinessContent => CONTENT[language];
