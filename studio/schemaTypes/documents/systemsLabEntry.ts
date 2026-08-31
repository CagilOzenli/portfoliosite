import { defineType, defineField } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

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
  name: 'systemsLabEntry',
  title: 'Systems Lab entry',
  type: 'document',
  icon: ComponentIcon,

  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'writeup', title: 'Write-up' },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Publishing' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      description: 'Ör. Player Movement, Interaction, Combat System, UI & Input.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'main',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      group: 'main',
      description: 'Kartta ve giriş bölümünde görünen tek cümle.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({ name: 'engine', title: 'Engine', type: 'string', group: 'main' }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'main',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related project',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'main',
      description: 'Bu sistem hangi projede kullanıldı (opsiyonel).',
    }),

    // --- Write-up ---
    defineField({ name: 'fullExplanation', title: 'How it works', type: 'text', rows: 6, group: 'writeup' }),
    defineField({ name: 'contribution', title: 'My contribution', type: 'text', rows: 3, group: 'writeup' }),
    defineField({ name: 'challenge', title: 'Challenge', type: 'text', rows: 3, group: 'writeup' }),
    defineField({ name: 'solution', title: 'Solution', type: 'text', rows: 3, group: 'writeup' }),

    // --- Media ---
    defineField({
      name: 'blueprintScreenshots',
      title: 'Blueprint / code screenshots',
      ...imageArray,
      group: 'media',
    }),
    defineField({
      name: 'gif',
      title: 'GIF / short clip',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      group: 'media',
    }),
    defineField({ name: 'video', title: 'Video link', type: 'url', group: 'media' }),
    defineField({ name: 'githubLink', title: 'GitHub link', type: 'url', group: 'media' }),

    // --- Publishing ---
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Kapalıyken public sitede hiç görünmez (taslak).',
    }),
    defineField({
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
      description: 'Yayında olsa bile bunu kapatarak siteden geçici olarak gizleyebilirsin.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'meta',
      initialValue: 100,
      description: 'Küçük sayı önce gelir.',
    }),
  ],

  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title A→Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', published: 'published', visible: 'visible', media: 'gif' },
    prepare({ title, published, visible, media }) {
      const flags = [published ? 'Published' : 'Draft', visible ? null : 'Hidden']
        .filter(Boolean)
        .join(' · ');
      return { title, media, subtitle: flags };
    },
  },
});
