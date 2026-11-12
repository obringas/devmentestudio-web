import { AppLanguage } from '../core/services/locale.service';

export interface PortfolioScreenshot {
  readonly src: string;
  readonly title: string;
  readonly caption: string;
}

export interface PortfolioCase {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly industry: string;
  readonly role: string;
  readonly coverImage: string;
  readonly situation: string;
  readonly work: string;
  readonly result: string;
  readonly technologies: readonly string[];
  readonly screenshots?: readonly PortfolioScreenshot[];
}

interface LocalizedPortfolioScreenshot {
  readonly src: string;
  readonly title: Record<AppLanguage, string>;
  readonly caption: Record<AppLanguage, string>;
}

interface LocalizedPortfolioCase
  extends Omit<
    PortfolioCase,
    'title' | 'industry' | 'role' | 'situation' | 'work' | 'result' | 'screenshots'
  > {
  readonly title: Record<AppLanguage, string>;
  readonly industry: Record<AppLanguage, string>;
  readonly role: Record<AppLanguage, string>;
  readonly situation: Record<AppLanguage, string>;
  readonly work: Record<AppLanguage, string>;
  readonly result: Record<AppLanguage, string>;
  readonly screenshots?: readonly LocalizedPortfolioScreenshot[];
}

const PORTFOLIO_CASES: readonly LocalizedPortfolioCase[] = [
  {
    id: 'case-excel-stock-medico',
    slug: 'de-excel-macros-a-sistema-web-stock',
    title: {
      es: 'De una planilla Excel con macros a un sistema de stock y panorama financiero',
      en: 'From a macro-heavy Excel spreadsheet to a stock and financial overview system',
    },
    industry: {
      es: 'Insumos médicos quirúrgicos',
      en: 'Surgical medical supplies',
    },
    role: {
      es: 'Arquitectura y desarrollo integral',
      en: 'End-to-end architecture and development',
    },
    coverImage: '/images/portfolio/medical-supplies-excel-to-web-es.png',
    situation: {
      es: 'El control de insumos para cirugías dependía de una planilla Excel con macros que se había vuelto inmanejable: sin alertas claras de vencimiento, sin trazabilidad de quién movía cada ítem ni visibilidad rápida del capital en el depósito.',
      en: 'Surgical supply control relied on a macro-driven Excel file that had become unmanageable: no clear expiration alerts, no audit trail of who moved each item and no quick view of warehouse capital.',
    },
    work: {
      es: 'En una semana pusimos en marcha un sistema web con altas por escaneo, bajas por destino, alertas de vencimiento a 30/60/90 días y un módulo Panorama en USD y ARS para que la dirección vea el capital en stock y las salidas del mes.',
      en: 'Within one week we launched a web system featuring scan-based entries, destination exits, 30/60/90-day expiration alerts and a USD/ARS executive overview showing stock capital and monthly outflows.',
    },
    result: {
      es: 'El depósito registra entradas y salidas en segundos con historial por usuario, y la gerencia consulta en tiempo real cuánta plata hay en stock, qué mercadería está en riesgo por vencimiento y qué clientes traccionan el mes.',
      en: 'The warehouse logs entries and exits in seconds with per-user history, while management checks in real time how much money is in stock, which items face expiration risk and which clients drive monthly volume.',
    },
    technologies: ['.NET', 'Angular', 'PostgreSQL (Supabase)'],
    screenshots: [
      {
        src: '/images/portfolio/medical-stock-operacion-es.png',
        title: {
          es: 'Operación diaria del depósito',
          en: 'Daily warehouse operations',
        },
        caption: {
          es: 'Semáforo de vencimientos (vencidos, 30, 45 y 60 días), altas por escaneo, últimos movimientos con responsable y destinos del mes.',
          en: 'Expiration status (expired, 30, 45 and 60 days), scan-based entries, recent movements with operator accountability and monthly destinations.',
        },
      },
      {
        src: '/images/portfolio/medical-stock-panorama-es.png',
        title: {
          es: 'Panorama ejecutivo para dirección y gerencia',
          en: 'Executive overview for owners and management',
        },
        caption: {
          es: 'Capital total en stock en USD o ARS, mercadería en riesgo por vencimiento, salidas del mes valorizadas por institución y productos de mayor peso financiero.',
          en: 'Total stock capital in USD or ARS, inventory at risk by expiration window, valued monthly outflows by institution and highest-weight products.',
        },
      },
    ],
  },
  {
    id: 'case-vfp-dotnet',
    slug: 'modernizacion-visual-foxpro-dotnet',
    title: { es: 'Modernización de un sistema de gestión histórico', en: 'Modernizing a historical management system' },
    industry: { es: 'Agroindustria / cooperativa', en: 'Agroindustry / cooperative' },
    role: { es: 'Líder técnico', en: 'Technical Lead' },
    coverImage: '/images/portfolio/visual-foxpro-modernization-es.png',
    situation: {
      es: 'Más de diez años en producción, reglas críticas sin documentar y una sola persona que entendía el sistema.',
      en: 'More than ten years in production, critical undocumented rules and only one person who understood the system.',
    },
    work: {
      es: 'Relevamos las reglas, aseguramos los datos y construimos el sistema nuevo al lado del viejo, reemplazando módulos por etapas.',
      en: 'We mapped the rules, secured the data and built the new system alongside the old one, replacing modules in stages.',
    },
    result: {
      es: 'La operación no se detuvo ni un día y la empresa dejó de depender de una persona.',
      en: 'Operations did not stop for a single day and the company stopped depending on one person.',
    },
    technologies: ['Visual FoxPro', '.NET 8', 'SQL Server', 'Next.js'],
  },
  {
    id: 'case-facturacion-electronica',
    slug: 'middleware-facturacion-electronica',
    title: { es: 'Facturación electrónica confiable', en: 'Reliable electronic invoicing' },
    industry: { es: 'Seguros', en: 'Insurance' },
    role: { es: 'Desarrollador senior', en: 'Senior Developer' },
    coverImage: '/images/portfolio/insurance-e-invoicing-architecture-es.png',
    situation: {
      es: 'Varios sistemas internos emitían comprobantes cada uno a su manera; cada cambio normativo había que hacerlo en todos.',
      en: 'Several internal systems issued receipts differently, so every regulatory change had to be repeated in all of them.',
    },
    work: {
      es: 'Construimos una capa única que habla con el organismo fiscal, reintenta cuando algo falla y deja rastro de cada comprobante.',
      en: 'We built one layer that communicates with the fiscal authority, retries failures and traces every receipt.',
    },
    result: {
      es: 'Un cambio de ARCA se resuelve en un solo lugar.',
      en: 'An ARCA change is now resolved in one place.',
    },
    technologies: ['.NET', 'SQL Server', 'API REST'],
  },
  {
    id: 'case-replicacion-sql-azure',
    slug: 'replicacion-transaccional-sql-azure',
    title: { es: 'Información disponible en la nube sin frenar la operación', en: 'Cloud data without disrupting operations' },
    industry: { es: 'Agroindustria', en: 'Agroindustry' },
    role: { es: 'Administrador de bases de datos y arquitecto', en: 'Database Administrator and Architect' },
    coverImage: '/images/portfolio/sql-transactional-replication-monitoring-es.png',
    situation: {
      es: 'La información se generaba en servidores locales y hacía falta disponerla fuera sin afectar los sistemas.',
      en: 'Information was generated on local servers and had to be available elsewhere without affecting operational systems.',
    },
    work: {
      es: 'Implementamos dos flujos de replicación independientes hacia la nube, con monitoreo y alertas por correo.',
      en: 'We implemented two independent cloud replication flows with monitoring and email alerts.',
    },
    result: {
      es: 'Los problemas se detectan antes de que los note un usuario.',
      en: 'Problems are detected before a user notices them.',
    },
    technologies: ['SQL Server', 'Replicación transaccional', 'Azure'],
  },
];

const localize = (item: LocalizedPortfolioCase, language: AppLanguage): PortfolioCase => ({
  id: item.id,
  slug: item.slug,
  title: item.title[language],
  industry: item.industry[language],
  role: item.role[language],
  coverImage: item.coverImage,
  situation: item.situation[language],
  work: item.work[language],
  result: item.result[language],
  technologies: item.technologies,
  screenshots: item.screenshots?.map((shot) => ({
    src: shot.src,
    title: shot.title[language],
    caption: shot.caption[language],
  })),
});

export const getPortfolioCases = (language: AppLanguage): readonly PortfolioCase[] =>
  PORTFOLIO_CASES.map((item) => localize(item, language));

export const getPortfolioCaseBySlug = (slug: string, language: AppLanguage): PortfolioCase | undefined => {
  const item = PORTFOLIO_CASES.find((portfolioCase) => portfolioCase.slug === slug);
  return item ? localize(item, language) : undefined;
};
