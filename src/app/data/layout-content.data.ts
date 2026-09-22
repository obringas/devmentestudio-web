import { AppLanguage } from '../core/services/locale.service';

export type HeaderContent = {
  readonly studioLabel: string;
  readonly cta: string;
  readonly languageLabel: string;
};

export type FooterContent = {
  readonly studioLabel: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly footerNote: string;
  readonly copyrightSuffix: string;
};

const HEADER_CONTENT: Record<AppLanguage, HeaderContent> = {
  en: {
    studioLabel: 'Software Studio',
    cta: 'Start a conversation',
    languageLabel: 'Language',
  },
  es: {
    studioLabel: 'Estudio de Software',
    cta: 'Hacer una consulta',
    languageLabel: 'Idioma',
  },
};

const FOOTER_CONTENT: Record<AppLanguage, FooterContent> = {
  en: {
    studioLabel: 'Software Studio',
    eyebrow: 'Continuity first. Technology in service of the business.',
    description:
      'We modernize management systems in stages and build the software your company needs to keep moving forward.',
    footerNote: 'Based in Salta, working throughout Argentina.',
    copyrightSuffix: 'All rights reserved.',
  },
  es: {
    studioLabel: 'Estudio de Software',
    eyebrow: 'Primero la continuidad. Después, la tecnología.',
    description:
      'Modernizamos sistemas de gestión por etapas y construimos el software que tu empresa necesita para seguir avanzando.',
    footerNote: 'Desde Salta, para empresas de toda la Argentina.',
    copyrightSuffix: 'Todos los derechos reservados.',
  },
};

export const getHeaderContent = (language: AppLanguage): HeaderContent => HEADER_CONTENT[language];

export const getFooterContent = (language: AppLanguage): FooterContent => FOOTER_CONTENT[language];
