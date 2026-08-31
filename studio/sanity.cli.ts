import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  /** Studio deploy edilince Sanity paketlerini otomatik güncel tutar. */
  deployment: { autoUpdates: true },
});
