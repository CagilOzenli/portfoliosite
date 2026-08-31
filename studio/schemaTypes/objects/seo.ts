import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Boş bırakılırsa sayfa/proje başlığı kullanılır. ~60 karakter.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Google sonuçlarında ve paylaşımlarda görünen özet. ~155 karakter.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Link paylaşıldığında görünen görsel (1200×630 önerilir).',
      options: { hotspot: true },
    }),
  ],
});
