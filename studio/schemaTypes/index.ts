import type { SchemaTypeDefinition } from 'sanity';

// Ortak object'ler
import seo from './objects/seo';

// Tekil (singleton) sayfalar
import siteSettings from './singletons/siteSettings';
import hero from './singletons/hero';
import about from './singletons/about';
import contact from './singletons/contact';
import navigation from './singletons/navigation';

// Koleksiyonlar
import project from './documents/project';
import systemsLabEntry from './documents/systemsLabEntry';

export const schemaTypes: SchemaTypeDefinition[] = [
  seo,
  siteSettings,
  hero,
  about,
  contact,
  navigation,
  project,
  systemsLabEntry,
];
