import { defineType, defineField } from 'sanity';
import { MenuIcon } from '@sanity/icons';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  description: 'Header menüsündeki bağlantılar ve sıraları.',
  fields: [
    defineField({
      name: 'items',
      title: 'Menu items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'path',
              title: 'Path',
              type: 'string',
              description: 'Site içi yol, ör. /work  ·  /systems-lab  ·  /cv',
              validation: (Rule) =>
                Rule.required().custom((v) =>
                  typeof v === 'string' && v.startsWith('/') ? true : '"/" ile başlamalı',
                ),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'path' },
          },
        },
      ],
      initialValue: [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Work', path: '/work' },
        { label: 'Systems Lab', path: '/systems-lab' },
        { label: 'Contact', path: '/contact' },
        { label: 'Download CV', path: '/cv' },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
});
