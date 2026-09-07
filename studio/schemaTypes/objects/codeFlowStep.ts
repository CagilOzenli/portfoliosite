import { defineType, defineField } from 'sanity';

/**
 * Bir "kod akışı" adımı — case study detay sayfasında dikey akış/zaman
 * çizelgesi olarak gösterilir. (Sadece codeFlowSteps array'inin içinde kullanılır.)
 */
export default defineType({
  name: 'codeFlowStep',
  title: 'Code flow step',
  type: 'object',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Küçük sayı önce gelir.',
      initialValue: 1,
    }),
    defineField({
      name: 'stepTitle',
      title: 'Step title',
      type: 'string',
      description: 'Kısa başlık — ör. "Input Handling", "State Transition".',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'text',
      rows: 3,
      description: 'Bu adımda akışta ne oluyor (2-4 cümle).',
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      type: 'image',
      description: 'Kod / Blueprint ekran görüntüsü.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'stepTitle', order: 'order', media: 'screenshot' },
    prepare({ title, order, media }) {
      return { title, subtitle: order != null ? `#${order}` : undefined, media };
    },
  },
});
