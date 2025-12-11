/**
 * Represents a service offered by DevMenteStudio
 */
export interface Service {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly icon: string;
  readonly features: readonly string[];
  readonly technologies: readonly Technology[];
  readonly benefits: readonly Benefit[];
  readonly pricing?: PricingTier;
  readonly cta: CallToAction;
}

export interface Technology {
  readonly name: string;
  readonly icon?: string;
}

export interface Benefit {
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
}

export interface PricingTier {
  readonly startingAt?: number;
  readonly currency: string;
  readonly period?: string;
  readonly description?: string;
}

export interface CallToAction {
  readonly text: string;
  readonly href: string;
}
