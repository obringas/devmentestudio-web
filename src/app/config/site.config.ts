/**
 * Site configuration
 */
export const siteConfig = {
  name: 'DevMenteStudio',
  description: 'Modernización gradual de sistemas de gestión, software a medida y soluciones digitales para empresas que no pueden parar.',
  url: 'https://devmentestudio.com',
  ogImage: 'https://devmentestudio.com/logo-nuevo.png',

  contact: {
    email: 'contacto@devmentestudio.com',
    phone: '+54 9 387 451-3777',
    whatsappUrl: 'https://wa.me/5493874513777?text=Hola%20Oscar%2C%20quiero%20consultar%20por%20la%20modernizaci%C3%B3n%20de%20mi%20sistema.',
    address: 'Salta, Argentina',
    form: {
      endpoint: 'https://api.web3forms.com/submit',
      accessKey: '85374833-6d06-4e43-8e21-59f74708dc05',
      subject: 'Nueva consulta desde devmentestudio.com',
    },
  },

  social: {
    linkedin: 'https://linkedin.com/company/devmentestudio',
    github: 'https://github.com/devmentestudio',
    twitter: 'https://twitter.com/devmentestudio',
    instagram: 'https://www.instagram.com/devmentestudio/',
    tiktok: 'https://tiktok.com/@devmentestudio',
    facebook: 'https://www.facebook.com/profile.php?id=61584849333412',
  },

  seo: {
    titleTemplate: '%s | DevMenteStudio',
    defaultTitle: 'Modernización de sistemas de gestión | DevMenteStudio',
    keywords: [
      'modernización de sistemas',
      'sistemas de gestión',
      'continuidad operativa',
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
