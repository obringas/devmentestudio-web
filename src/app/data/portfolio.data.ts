import { AppLanguage } from '../core/services/locale.service';

export interface PortfolioCase {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly industry: string;
  readonly role: string;
  readonly coverImage: string;
  readonly summary: string;
  readonly solution: string;
  readonly technologies: readonly string[];
}

interface LocalizedPortfolioCase {
  readonly id: string;
  readonly slug: string;
  readonly title: Record<AppLanguage, string>;
  readonly industry: Record<AppLanguage, string>;
  readonly role: Record<AppLanguage, string>;
  readonly coverImage: string;
  readonly summary: Record<AppLanguage, string>;
  readonly solution: Record<AppLanguage, string>;
  readonly technologies: readonly string[];
}

const PORTFOLIO_CASES: readonly LocalizedPortfolioCase[] = [
  {
    id: 'case-vfp-dotnet',
    slug: 'modernizacion-visual-foxpro-dotnet',
    title: {
      es: 'Modernización de un sistema Visual FoxPro hacia .NET 8',
      en: 'Visual FoxPro to .NET 8 System Modernization',
    },
    industry: {
      es: 'Agroindustria / cooperativa',
      en: 'Agroindustry / cooperative',
    },
    role: {
      es: 'Líder técnico',
      en: 'Technical Lead',
    },
    coverImage: '/images/portfolio/visual-foxpro-modernization-es.png',
    summary: {
      es: 'Sistema de gestión desarrollado en Visual FoxPro, con más de una década en producción y reglas de negocio críticas sin documentar. El objetivo no era reescribirlo de cero, sino modernizarlo sin interrumpir la operación diaria.',
      en: 'Management system built in Visual FoxPro, with over a decade in production and critical undocumented business rules. The objective was not a risky rewrite from scratch, but modernizing it without halting daily operations.',
    },
    solution: {
      es: 'Se relevaron las reglas existentes, se migraron los datos desde archivos DBF hacia SQL Server y se diseñó una arquitectura de convivencia que permite que el sistema histórico y la nueva plataforma .NET 8 operen sobre la misma información. Los módulos se reemplazan por etapas, empezando por los de menor riesgo, con posibilidad de volver atrás en cada una.',
      en: 'Existing business rules were discovered and mapped, data was migrated from DBF files to SQL Server, and a coexistence architecture was designed allowing the legacy system and the new .NET 8 platform to operate concurrently over shared data. Modules are replaced in phases starting with the lowest risk, with full rollback capability at each step.',
    },
    technologies: [
      'Visual FoxPro',
      '.NET 8',
      'C#',
      'SQL Server',
      'Next.js',
      'Clean Architecture',
    ],
  },
  {
    id: 'case-facturacion-electronica',
    slug: 'middleware-facturacion-electronica',
    title: {
      es: 'Middleware de facturación electrónica',
      en: 'Electronic Invoicing Middleware',
    },
    industry: {
      es: 'Seguros',
      en: 'Insurance',
    },
    role: {
      es: 'Desarrollador senior',
      en: 'Senior Developer',
    },
    coverImage: '/images/portfolio/insurance-e-invoicing-architecture-es.png',
    summary: {
      es: 'Integración entre los sistemas internos de una compañía de seguros y los webservices de facturación electrónica del organismo fiscal. El desafío: emitir comprobantes de forma confiable sin acoplar la lógica fiscal a las aplicaciones de negocio.',
      en: 'Integration between the internal core systems of an insurance company and the fiscal authority electronic invoicing webservices. The challenge: reliably issuing receipts without coupling fiscal logic to core business apps.',
    },
    solution: {
      es: 'Se construyó una capa intermedia responsable de la comunicación con el organismo, el manejo de reintentos y la trazabilidad de cada comprobante, de modo que un cambio normativo se resuelva en un solo lugar y no en cada sistema.',
      en: 'An intermediate middleware layer was built to manage external fiscal communication, automatic retries, and end-to-end receipt traceability, ensuring regulatory changes are resolved in a single place rather than inside every subsystem.',
    },
    technologies: ['.NET', 'C#', 'SQL Server', 'API REST', 'Facturación electrónica'],
  },
  {
    id: 'case-replicacion-sql-azure',
    slug: 'replicacion-transaccional-sql-azure',
    title: {
      es: 'Replicación transaccional SQL Server hacia Azure',
      en: 'SQL Server Transactional Replication to Azure',
    },
    industry: {
      es: 'Agroindustria',
      en: 'Agroindustry',
    },
    role: {
      es: 'Administrador de bases de datos y arquitecto',
      en: 'Database Administrator & Architect',
    },
    coverImage: '/images/portfolio/sql-transactional-replication-monitoring-es.png',
    summary: {
      es: 'Necesidad de disponer en la nube de información generada en servidores locales, sin afectar el rendimiento de los sistemas que operan sobre ellos.',
      en: 'Need for real-time cloud availability of data generated on local on-premise servers, without impacting the operational performance of transactional systems.',
    },
    solution: {
      es: 'Se implementaron dos flujos de replicación transaccional independientes y unidireccionales desde publicadores locales hacia suscriptores en Azure, con monitoreo de ambos flujos y alertas por correo ante demoras o interrupciones, para detectar los problemas antes que los usuarios.',
      en: 'Two independent, unidirectional transactional replication pipelines were deployed from local publishers to Azure subscribers, accompanied by automated health monitoring and email alerts for latency or interruptions to detect issues before users do.',
    },
    technologies: [
      'SQL Server',
      'Replicación transaccional',
      'Microsoft Azure',
      'Monitoreo y alertas',
    ],
  },
];

export const getPortfolioCases = (language: AppLanguage): readonly PortfolioCase[] =>
  PORTFOLIO_CASES.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title[language],
    industry: item.industry[language],
    role: item.role[language],
    coverImage: item.coverImage,
    summary: item.summary[language],
    solution: item.solution[language],
    technologies: item.technologies,
  }));

export const getPortfolioCaseBySlug = (
  slug: string,
  language: AppLanguage,
): PortfolioCase | undefined => {
  const item = PORTFOLIO_CASES.find((c) => c.slug === slug);
  if (!item) return undefined;
  return {
    id: item.id,
    slug: item.slug,
    title: item.title[language],
    industry: item.industry[language],
    role: item.role[language],
    coverImage: item.coverImage,
    summary: item.summary[language],
    solution: item.solution[language],
    technologies: item.technologies,
  };
};
