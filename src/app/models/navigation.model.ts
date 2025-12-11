/**
 * Navigation related types
 */
export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavItem[];
  readonly external?: boolean;
  readonly icon?: string;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly NavItem[];
}

export interface SocialLink {
  readonly platform: string;
  readonly url: string;
  readonly icon: string;
  readonly label: string;
}
