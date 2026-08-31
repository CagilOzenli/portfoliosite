import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      initialValue: 'Çağıl Özenli',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 2,
      description: 'Arama motorları ve link paylaşımları için varsayılan açıklama.',
      initialValue: 'Game developer — gameplay systems and playable experiences.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV file (PDF)',
      type: 'file',
      description: 'Sitedeki "Download CV" / /cv linki bu dosyaya gider. Yeni sürüm için sadece dosyayı değiştir.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
        defineField({
          name: 'email',
          title: 'Email address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Default social share image',
      type: 'image',
      description: 'Sayfaların kendi görseli yoksa link paylaşımında bu kullanılır (1200×630).',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
