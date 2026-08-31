import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemaTypes';
import { structure, singletonTypes, singletonActions } from './structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    'studio/.env eksik: SANITY_STUDIO_PROJECT_ID ve SANITY_STUDIO_DATASET tanımla ' +
      '(studio/.env.example dosyasını kopyala).',
  );
}

export default defineConfig({
  name: 'default',
  title: 'Çağıl Özenli — Portfolio',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision: GROQ sorgularını denemek için (yalnızca geliştirici aracı)
    visionTool({ defaultApiVersion: '2025-01-01' }),
  ],

  schema: {
    types: schemaTypes,
    // Singleton tiplerini "yeni document" menüsünden gizle
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Singleton'larda create/delete/duplicate işlemlerini kaldır
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
