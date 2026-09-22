import { AppLanguage } from '../core/services/locale.service';

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
}

interface LocalizedPortfolioCase extends Omit<PortfolioCase, 'title' | 'industry' | 'role' | 'situation' | 'work' | 'result'> {
  readonly title: Record<AppLanguage, string>;
  readonly industry: Record<AppLanguage, string>;
  readonly role: Record<AppLanguage, string>;
  readonly situation: Record<AppLanguage, string>;
  readonly work: Record<AppLanguage, string>;
  readonly result: Record<AppLanguage, string>;
}

const PORTFOLIO_CASES: readonly LocalizedPortfolioCase[] = [
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
});

export const getPortfolioCases = (language: AppLanguage): readonly PortfolioCase[] =>
  PORTFOLIO_CASES.map((item) => localize(item, language));

export const getPortfolioCaseBySlug = (slug: string, language: AppLanguage): PortfolioCase | undefined => {
  const item = PORTFOLIO_CASES.find((portfolioCase) => portfolioCase.slug === slug);
  return item ? localize(item, language) : undefined;
};
