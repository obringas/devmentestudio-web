/**
 * Represents a client testimonial
 */
export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly avatarUrl?: string;
  readonly companyLogoUrl?: string;
  readonly rating?: number;
  readonly projectId?: string;
  readonly featured: boolean;
}
