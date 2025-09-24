export interface SocialLink {
  platform:
    | "linkedin"
    | "twitter"
    | "instagram"
    | "github"
    | "email"
    | "website";
  url: string;
  username?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department?: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
}

export interface TeamDepartment {
  id: string;
  name: string;
  description: string;
  color: string;
  members: TeamMember[];
}
