import { defineType, defineField } from 'sanity';
import { UserIcon } from '@sanity/icons';

const tagList = {
  type: 'array' as const,
  of: [{ type: 'string' as const }],
  options: { layout: 'tags' as const },
};

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
      description: 'Kısa ve dürüst. Boş satır = yeni paragraf. Kendini "senior/uzman" gibi gösterme.',
    }),
    defineField({
      name: 'currentFocus',
      title: 'Current focus',
      type: 'text',
      rows: 2,
      description: 'Şu an ne üzerinde çalışıyorsun / neyi öğreniyorsun.',
    }),
    defineField({ name: 'skills', title: 'Skills', ...tagList }),
    defineField({ name: 'tools', title: 'Tools', ...tagList }),
    defineField({ name: 'languages', title: 'Languages', ...tagList }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'Ör. "Open to junior roles & internships".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Dairesel gösterilir. Yoksa nötr bir yer tutucu görünür.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'About' }) },
});
