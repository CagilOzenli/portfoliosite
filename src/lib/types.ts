/**
 * Sanity'den gelen içeriğin TypeScript tipleri.
 * studio/schemaTypes/ içindeki şemalarla elle eşleştirilmiştir.
 * Şemayı değiştirirsen burayı da güncelle.
 */

export interface SanityImage {
  _type: 'image';
  asset?: { _ref: string; _type: 'reference' };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityFileRef {
  url: string | null;
  originalFilename?: string | null;
}

/* ---- Singleton'lar ---------------------------------------------------- */

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  cvUrl: string | null;
  cvFileName: string | null;
  social: SocialLinks;
  ogImage?: SanityImage;
}

export interface Hero {
  name: string;
  role: string;
  tagline: string;
  ctaLabel: string;
  backgroundImage?: SanityImage;
}

export interface NavItem {
  label: string;
  path: string;
}
export interface Navigation {
  items: NavItem[];
}

export interface About {
  bio?: string;
  currentFocus?: string;
  skills?: string[];
  tools?: string[];
  languages?: string[];
  location?: string;
  availability?: string;
  photo?: SanityImage;
}

export interface Contact {
  heading: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

/* ---- Koleksiyonlar -------------------------------------------------- */

export type ProjectStatus = 'prototype' | 'wip' | 'completed' | 'paused';

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Project {
  _id: string;
  name: string;
  slug: string;
  coverImage?: SanityImage;
  shortDescription?: string;
  fullDescription?: string;
  engine?: string;
  devTools?: string[];
  genre?: string;
  role?: string;
  status?: ProjectStatus;
  responsibilities?: string;
  systemsImplemented?: string;
  technicalChallenges?: string;
  solutions?: string;
  lessonsLearned?: string;
  screenshots?: SanityImage[];
  gifs?: SanityImage[];
  videos?: string[];
  repoLink?: string;
  buildLink?: string;
  externalLink?: string;
  featured?: boolean;
  published?: boolean;
  order?: number;
  seo?: Seo;
}

export interface SystemsLabEntry {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  fullExplanation?: string;
  engine?: string;
  tools?: string[];
  relatedProject?: { name: string; slug: string } | null;
  contribution?: string;
  challenge?: string;
  solution?: string;
  blueprintScreenshots?: SanityImage[];
  gif?: SanityImage;
  video?: string;
  githubLink?: string;
  visible?: boolean;
  published?: boolean;
  order?: number;
}

/** Kart etiketi: status alanından okunur, yoksa generic placeholder. */
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  prototype: 'PROTOTYPE',
  wip: 'WORK IN PROGRESS',
  completed: 'GAME PROJECT',
  paused: 'ON HOLD',
};
