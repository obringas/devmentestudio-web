/**
 * Represents a team member
 */
export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly avatarUrl: string;
  readonly socialLinks: readonly TeamSocialLink[];
  readonly skills: readonly string[];
  readonly featured: boolean;
}

export interface TeamSocialLink {
  readonly platform: SocialPlatform;
  readonly url: string;
}

export type SocialPlatform = 
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'instagram'
  | 'website';
