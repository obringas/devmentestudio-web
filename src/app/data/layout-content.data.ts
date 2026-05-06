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
    cta: 'Book a call',
    languageLabel: 'Language',
  },
  es: {
    studioLabel: 'Estudio de Software',
    cta: 'Agendar reunion',
    languageLabel: 'Idioma',
  },
};

const FOOTER_CONTENT: Record<AppLanguage, FooterContent> = {
  en: {
    studioLabel: 'Software Studio',
    eyebrow: 'We build software with business clarity',
    description:
      'We design websites, experiences and digital products that make your business look serious, clear and ready to sell.',
    footerNote: 'Made in Salta, Argentina for brands that want to look professional.',
    copyrightSuffix: 'All rights reserved.',
  },
  es: {
    studioLabel: 'Estudio de Software',
    eyebrow: 'Hacemos software con criterio de negocio',
    description:
      'Disenamos sitios, experiencias y productos digitales que hacen ver a tu negocio serio, claro y listo para vender.',
    footerNote: 'Hecho en Salta, Argentina para marcas que quieren verse profesionales.',
    copyrightSuffix: 'Todos los derechos reservados.',
  },
};

export const getHeaderContent = (language: AppLanguage): HeaderContent => HEADER_CONTENT[language];

export const getFooterContent = (language: AppLanguage): FooterContent => FOOTER_CONTENT[language];
