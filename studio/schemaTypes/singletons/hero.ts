import { defineType, defineField } from 'sanity';
import { RocketIcon } from '@sanity/icons';

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name (line 1)',
      type: 'string',
      initialValue: 'ÇAĞIL ÖZENLİ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role (line 2)',
      type: 'string',
      initialValue: 'GAME DEVELOPER',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (line 3)',
      type: 'string',
      initialValue: 'I build gameplay systems and playable experiences.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      initialValue: 'View Work',
      validation: (Rule) => Rule.required().max(24),
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero' }) },
});
