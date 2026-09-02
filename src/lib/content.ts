/**
 * İçerik erişim katmanı.
 * Sayfalar/component'ler yalnızca buradaki fonksiyonları çağırır — GROQ'u değil.
 *
 * TASARIM KURALI: Sanity boşsa / erişilemezse bile `npm run build` ÇÖKMEZ.
 * Her fonksiyon güvenli bir varsayılan döndürür ve sayfalar "boş state"
 * (placeholder) gösterir. Uydurma içerik YOK — sadece nötr yer tutucular.
 */
import { sanityClient } from './sanity';
import * as Q from './queries';
import type {
  About,
  Contact,
  Hero,
  Navigation,
  NavItem,
  Project,
  SiteSettings,
  SystemsLabEntry,
} from './types';

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data == null ? fallback : data;
  } catch (err) {
    console.warn(`[content] Sanity sorgusu başarısız, fallback kullanılıyor: ${(err as Error).message}`);
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/*  Sabit yer tutucular (Sanity boşken gösterilir)                     */
/* ------------------------------------------------------------------ */

export const DEFAULT_NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/work' },
  { label: 'Systems Lab', path: '/systems-lab' },
  { label: 'Contact', path: '/contact' },
  { label: 'Download CV', path: '/cv' },
];

export const DEFAULT_HERO: Hero = {
  name: 'ÇAĞIL ÖZENLİ',
  role: 'GAME DEVELOPER',
  tagline: 'I build gameplay systems and playable experiences.',
  ctaLabel: 'View Work',
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Çağıl Özenli',
  siteDescription: 'Game developer — gameplay systems and playable experiences.',
  cvUrl: null,
  cvFileName: null,
  social: {},
};

export const DEFAULT_CONTACT: Contact = {
  heading: "Let's Talk",
};

/** Systems Lab index'i CMS boşken gösterilecek 4 sabit kategori kartı. */
export const SYSTEMS_LAB_PLACEHOLDERS: { title: string; slug: null }[] = [
  { title: 'Player Movement', slug: null },
  { title: 'Interaction', slug: null },
  { title: 'Combat System', slug: null },
  { title: 'UI & Input', slug: null },
];

/** Homepage'de featured proje yokken gösterilecek 2 nötr kart etiketi. */
export const FEATURED_PLACEHOLDERS: { label: string }[] = [
  { label: 'GAME PROJECT' },
  { label: 'PROTOTYPE' },
];

/* ------------------------------------------------------------------ */
/*  Singleton getirenler                                               */
/* ------------------------------------------------------------------ */

export const getSiteSettings = () =>
  safeFetch<SiteSettings>(Q.SITE_SETTINGS_QUERY, {}, DEFAULT_SITE_SETTINGS);

export const getHero = () => safeFetch<Hero>(Q.HERO_QUERY, {}, DEFAULT_HERO);

export async function getNavigation(): Promise<NavItem[]> {
  const nav = await safeFetch<Navigation | null>(Q.NAVIGATION_QUERY, {}, null);
  const items = nav?.items?.filter((i) => i?.label && i?.path);
  return items && items.length > 0 ? items : DEFAULT_NAV;
}

export const getAbout = () => safeFetch<About | null>(Q.ABOUT_QUERY, {}, null);

export const getContact = () => safeFetch<Contact>(Q.CONTACT_QUERY, {}, DEFAULT_CONTACT);

/* ------------------------------------------------------------------ */
/*  Projeler                                                           */
/* ------------------------------------------------------------------ */

export const getFeaturedProjects = () =>
  safeFetch<Project[]>(Q.FEATURED_PROJECTS_QUERY, {}, []);

export const getAllProjects = () => safeFetch<Project[]>(Q.ALL_PROJECTS_QUERY, {}, []);

export const getProjectSlugs = () => safeFetch<string[]>(Q.PROJECT_SLUGS_QUERY, {}, []);

export const getProjectBySlug = (slug: string) =>
  safeFetch<Project | null>(Q.PROJECT_BY_SLUG_QUERY, { slug }, null);

/* ------------------------------------------------------------------ */
/*  Systems Lab                                                        */
/* ------------------------------------------------------------------ */

export const getSystemsLabEntries = () =>
  safeFetch<SystemsLabEntry[]>(Q.SYSTEMS_LAB_LIST_QUERY, {}, []);

export const getSystemsLabSlugs = () =>
  safeFetch<string[]>(Q.SYSTEMS_LAB_SLUGS_QUERY, {}, []);

export const getSystemsLabEntryBySlug = (slug: string) =>
  safeFetch<SystemsLabEntry | null>(Q.SYSTEMS_LAB_BY_SLUG_QUERY, { slug }, null);
