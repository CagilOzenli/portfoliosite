/**
 * Sanity istemcisi.
 * Site STATİK: bu istemci yalnızca `npm run build` sırasında (ve dev'de)
 * yayınlanmış içeriği okumak için kullanılır. Tarayıcıya gizli anahtar gitmez.
 */
import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-01-01';

if (!projectId || !dataset) {
  throw new Error(
    '[sanity] PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET tanımlı değil. ' +
      'Kök dizinde .env dosyası oluştur (.env.example dosyasını kopyala).',
  );
}

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: false -> build sırasında CANLI API'den çeker (önbellekli CDN değil).
  // Neden: Publish'ten hemen sonra tetiklenen build, CDN'de eski/boş veriyi
  // yakalamasın. Build seyrek olduğu için CDN'in hız/maliyet avantajına gerek yok.
  useCdn: false,
  perspective: 'published',
});

export { projectId, dataset, apiVersion };
