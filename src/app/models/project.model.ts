/**
 * Represents a portfolio project
 */
export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly client?: string;
  readonly category: ProjectCategory;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly thumbnailUrl: string;
  readonly images: readonly ProjectImage[];
  readonly technologies: readonly string[];
  readonly features: readonly string[];
  readonly results?: readonly ProjectResult[];
  readonly testimonial?: ProjectTestimonial;
  readonly liveUrl?: string;
  readonly caseStudyUrl?: string;
  readonly completedAt: string;
  readonly featured: boolean;
}

export type ProjectCategory = 
  | 'landing-page'
  | 'ecommerce'
  | 'web-app'
  | 'mobile-app'
  | 'consulting';

export interface ProjectImage {
  readonly url: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface ProjectResult {
  readonly metric: string;
  readonly value: string;
  readonly description?: string;
}

export interface ProjectTestimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly avatarUrl?: string;
}

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  'landing-page': 'Landing Page',
  'ecommerce': 'E-commerce',
  'web-app': 'Aplicación Web',
  'mobile-app': 'App Móvil',
  'consulting': 'Consultoría',
};
