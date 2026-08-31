import { defineType, defineField } from 'sanity';
import { ProjectsIcon } from '@sanity/icons';

const imageArray = {
  type: 'array' as const,
  of: [
    {
      type: 'image' as const,
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' as const }],
    },
  ],
  options: { layout: 'grid' as const },
};

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,

  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'writeup', title: 'Case study' },
    { name: 'media', title: 'Media' },
    { name: 'links', title: 'Links' },
    { name: 'meta', title: 'Publishing & SEO' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'main',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'main',
      description: 'Kart ve case study üstündeki büyük görsel. Yoksa greybox yer tutucu gösterilir.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      group: 'main',
      description: 'Kartta ve case study girişinde görünen tek cümlelik özet.',
      validation: (Rule) => Rule.max(200),
    }),

    // --- Künye ---
    defineField({ name: 'engine', title: 'Engine', type: 'string', group: 'main' }),
    defineField({
      name: 'devTools',
      title: 'Dev tools',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'main',
    }),
    defineField({ name: 'genre', title: 'Genre', type: 'string', group: 'main' }),
    defineField({ name: 'role', title: 'Your role', type: 'string', group: 'main' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Prototype', value: 'prototype' },
          { title: 'Work in progress', value: 'wip' },
          { title: 'Completed', value: 'completed' },
          { title: 'Paused', value: 'paused' },
        ],
        layout: 'radio',
      },
      initialValue: 'prototype',
    }),

    // --- Case study metni (hepsi çok satırlı düz metin) ---
    defineField({ name: 'fullDescription', title: 'Overview', type: 'text', rows: 5, group: 'writeup' }),
    defineField({ name: 'responsibilities', title: 'Responsibilities', type: 'text', rows: 4, group: 'writeup' }),
    defineField({ name: 'systemsImplemented', title: 'Systems implemented', type: 'text', rows: 4, group: 'writeup' }),
    defineField({ name: 'technicalChallenges', title: 'Technical challenges', type: 'text', rows: 4, group: 'writeup' }),
    defineField({ name: 'solutions', title: 'Solutions', type: 'text', rows: 4, group: 'writeup' }),
    defineField({ name: 'lessonsLearned', title: 'Lessons learned', type: 'text', rows: 4, group: 'writeup' }),

    // --- Medya ---
    defineField({ name: 'screenshots', title: 'Screenshots', ...imageArray, group: 'media' }),
    defineField({ name: 'gifs', title: 'GIFs / short clips', ...imageArray, group: 'media' }),
    defineField({
      name: 'videos',
      title: 'Video links',
      type: 'array',
      of: [{ type: 'url' }],
      group: 'media',
      description: 'YouTube / Vimeo vb. bağlantıları.',
    }),

    // --- Bağlantılar ---
    defineField({ name: 'repoLink', title: 'Repository link', type: 'url', group: 'links' }),
    defineField({ name: 'buildLink', title: 'Playable build link', type: 'url', group: 'links' }),
    defineField({ name: 'externalLink', title: 'External link', type: 'url', group: 'links' }),

    // --- Yayın & sıralama ---
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Kapalıyken proje public sitede hiç görünmez (taslak).',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Ana sayfada en fazla 2 proje featured olabilir.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;
          const { getClient, document } = context;
          const client = getClient({ apiVersion: '2025-01-01' });
          const id = (document?._id || '').replace(/^drafts\./, '');
          const count = await client.fetch<number>(
            `count(*[_type == "project" && featured == true && !(_id in [$id, $draft])])`,
            { id, draft: `drafts.${id}` },
          );
          return count >= 2
            ? 'Zaten 2 proje "featured". Önce birinden bu işareti kaldır.'
            : true;
        }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'meta',
      description: 'Küçük sayı önce gelir. Listeleri elle sıralamak için.',
      initialValue: 100,
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'meta' }),
  ],

  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A→Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
      published: 'published',
      featured: 'featured',
      status: 'status',
    },
    prepare({ title, media, published, featured, status }) {
      const flags = [
        published ? 'Published' : 'Draft',
        featured ? '★ Featured' : null,
        status,
      ]
        .filter(Boolean)
        .join(' · ');
      return { title, media, subtitle: flags };
    },
  },
});
