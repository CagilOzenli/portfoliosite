import type { StructureResolver } from 'sanity/structure';
import {
  CogIcon,
  RocketIcon,
  UserIcon,
  EnvelopeIcon,
  MenuIcon,
  ProjectsIcon,
  ComponentIcon,
} from '@sanity/icons';

/** Tekil (singleton) document tipleri — kullanıcı yenisini oluşturamaz, silemez. */
export const singletonTypes = new Set<string>([
  'siteSettings',
  'hero',
  'about',
  'contact',
  'navigation',
]);

/** Singleton'larda izin verilen işlemler (yeni/sil yok). */
export const singletonActions = new Set<string>([
  'publish',
  'discardChanges',
  'restore',
  'unpublish',
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Hero')
        .id('hero')
        .icon(RocketIcon)
        .child(S.document().schemaType('hero').documentId('hero')),

      S.listItem()
        .title('About')
        .id('about')
        .icon(UserIcon)
        .child(S.document().schemaType('about').documentId('about')),

      S.listItem()
        .title('Contact Information')
        .id('contact')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contact').documentId('contact')),

      S.listItem()
        .title('Navigation')
        .id('navigation')
        .icon(MenuIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),

      S.divider(),

      S.listItem()
        .title('Work (Projects)')
        .icon(ProjectsIcon)
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Work (Projects)')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Systems Lab')
        .icon(ComponentIcon)
        .schemaType('systemsLabEntry')
        .child(
          S.documentTypeList('systemsLabEntry')
            .title('Systems Lab')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
    ]);
