/**
 * GROQ sorguları — Sanity'den TAM OLARAK hangi alanları istediğimizi belirtir.
 * Kural: her yerde `published == true` (ve Systems Lab'de `visible == true`)
 * filtresi var; taslak / gizli içerik public siteye asla sızmaz.
 */

/* ---- Singleton'lar (sabit _id ile tek kayıt) ------------------------ */

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_id == "siteSettings"][0]{
  "siteTitle": coalesce(siteTitle, "Çağıl Özenli"),
  "siteDescription": coalesce(siteDescription, "Game developer — gameplay systems and playable experiences."),
  "cvUrl": cvFile.asset->url,
  "cvFileName": cvFile.asset->originalFilename,
  "social": {
    "linkedin": social.linkedin,
    "github": social.github,
    "email": social.email
  },
  ogImage
}`;

export const HERO_QUERY = /* groq */ `
*[_id == "hero"][0]{
  "name": coalesce(name, "ÇAĞIL ÖZENLİ"),
  "role": coalesce(role, "GAME DEVELOPER"),
  "tagline": coalesce(tagline, "I build gameplay systems and playable experiences."),
  "ctaLabel": coalesce(ctaLabel, "View Work")
}`;

export const NAVIGATION_QUERY = /* groq */ `
*[_id == "navigation"][0]{
  items[]{ label, path }
}`;

export const ABOUT_QUERY = /* groq */ `
*[_id == "about"][0]{
  bio, currentFocus, skills, tools, languages, location, availability, photo
}`;

export const CONTACT_QUERY = /* groq */ `
*[_id == "contact"][0]{
  "heading": coalesce(heading, "Let's Talk"),
  email, linkedin, github
}`;

/* ---- Projeler ----------------------------------------------------- */

const PROJECT_CARD_FIELDS = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  coverImage,
  shortDescription,
  genre,
  status,
  featured,
  order
`;

export const FEATURED_PROJECTS_QUERY = /* groq */ `
*[_type == "project" && published == true && featured == true]
  | order(order asc, name asc)[0...2]{
  ${PROJECT_CARD_FIELDS}
}`;

export const ALL_PROJECTS_QUERY = /* groq */ `
*[_type == "project" && published == true]
  | order(order asc, name asc){
  ${PROJECT_CARD_FIELDS}
}`;

export const PROJECT_SLUGS_QUERY = /* groq */ `
*[_type == "project" && published == true && defined(slug.current)].slug.current`;

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
*[_type == "project" && published == true && slug.current == $slug][0]{
  _id, name, "slug": slug.current,
  coverImage, shortDescription, fullDescription,
  engine, devTools, genre, role, status,
  responsibilities, systemsImplemented, technicalChallenges, solutions, lessonsLearned,
  screenshots, gifs, videos,
  repoLink, buildLink, externalLink,
  seo
}`;

/* ---- Systems Lab ------------------------------------------------- */

const SYSTEMS_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  engine,
  order
`;

export const SYSTEMS_LAB_LIST_QUERY = /* groq */ `
*[_type == "systemsLabEntry" && published == true && visible == true]
  | order(order asc, title asc){
  ${SYSTEMS_CARD_FIELDS}
}`;

export const SYSTEMS_LAB_SLUGS_QUERY = /* groq */ `
*[_type == "systemsLabEntry" && published == true && visible == true && defined(slug.current)].slug.current`;

export const SYSTEMS_LAB_BY_SLUG_QUERY = /* groq */ `
*[_type == "systemsLabEntry" && published == true && visible == true && slug.current == $slug][0]{
  _id, title, "slug": slug.current,
  summary, fullExplanation,
  engine, tools,
  "relatedProject": relatedProject->{ name, "slug": slug.current },
  contribution, challenge, solution,
  blueprintScreenshots, gif, video, githubLink
}`;
