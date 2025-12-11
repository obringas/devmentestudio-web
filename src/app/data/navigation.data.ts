import { NavItem, FooterSection } from '../models';

export const MAIN_NAV: readonly NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: 'Servicios',
    links: [
      { label: 'Landing Pages', href: '/servicios/landing-pages' },
      { label: 'E-commerce', href: '/servicios/ecommerce' },
      { label: 'Desarrollo a Medida', href: '/servicios/desarrollo-a-medida' },
      { label: 'Consultoría', href: '/servicios/consultoria' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y Condiciones', href: '/terminos' },
      { label: 'Política de Privacidad', href: '/privacidad' },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { platform: 'linkedin', url: 'https://linkedin.com/company/devmentestudio', icon: 'linkedin', label: 'LinkedIn' },
  { platform: 'github', url: 'https://github.com/devmentestudio', icon: 'github', label: 'GitHub' },
  { platform: 'twitter', url: 'https://twitter.com/devmentestudio', icon: 'twitter', label: 'Twitter' },
  { platform: 'instagram', url: 'https://instagram.com/devmentestudio', icon: 'instagram', label: 'Instagram' },
] as const;
