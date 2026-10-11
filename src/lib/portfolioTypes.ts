export type SkillCategory = {
  _id?: string;
  category: string;
  skills: string[];
  order: number;
};

export type ExperienceItem = {
  _id?: string;
  title: string;
  company: string;
  type: string;
  workplace: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  order: number;
};

export type ProjectItem = {
  _id?: string;
  category: string;
  title: string;
  description: string;
  status: string;
  location: string;
  services: string[];
  tech: string[];
  github: string;
  live: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  isVisible: boolean;
  featured: boolean;
  image: string;
  imageFit?: "cover" | "contain";
  video: string;
  order: number;
};

export type CertItem = {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  mediaUrl: string;
  mediaType: string;
  mediaName: string;
  icon: string;
  order: number;
};

export type PortfolioProfile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  statusLabel: string;
  experienceYears: string;
  platformCount: number;
  roleCount: number;
  resumeUrl: string;
  stack: string[];
  bio: string;
  email: string;
  github: string;
  githubWork: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  phone: string;
  website: string;
}
