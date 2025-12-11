/**
 * Site configuration
 */
export const siteConfig = {
  name: 'DevMenteStudio',
  description: 'Desarrollo de software profesional: Landing Pages, E-commerce, Aplicaciones a Medida y Consultoría en Arquitectura de Software.',
  url: 'https://devmentestudio.com',
  ogImage: 'https://devmentestudio.com/og-image.jpg',
  
  contact: {
    email: 'hola@devmentestudio.com',
    phone: '+54 9 387 XXX XXXX',
    address: 'Salta, Argentina',
  },
  
  social: {
    linkedin: 'https://linkedin.com/company/devmentestudio',
    github: 'https://github.com/devmentestudio',
    twitter: 'https://twitter.com/devmentestudio',
    instagram: 'https://instagram.com/devmentestudio',
  },
  
  seo: {
    titleTemplate: '%s | DevMenteStudio',
    defaultTitle: 'DevMenteStudio - Desarrollo de Software Profesional',
    keywords: [
      'desarrollo web',
      'landing page',
      'ecommerce',
      'software a medida',
      'consultoría',
      'arquitectura de software',
      'angular',
      '.net',
      'salta',
      'argentina',
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
