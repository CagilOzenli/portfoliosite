import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "Let's Talk",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      description: 'Boş bırakılırsa Site Settings → Social → email kullanılır.',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'Uluslararası biçim önerilir, ör. +90 5xx xxx xx xx. Boş bırakılabilir.',
    }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Information' }) },
});
