import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  /** `sanity deploy` bu adrese yayınlar: https://cagilozenli.sanity.studio */
  studioHost: 'cagilozenli',
  deployment: {
    // Sanity Manage'deki bu studio uygulamasının kimliği (deploy'da sormasın diye)
    appId: 'xek3tj7z015hkwul6sly4m65',
    /** Deploy edilince Sanity paketlerini otomatik güncel tutar. */
    autoUpdates: true,
  },
});
