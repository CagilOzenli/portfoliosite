// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Kanonik URL'ler ve sitemap için kullanılır.
  site: 'https://cagilozenli.dev',

  // URL'lerin sonunda "/" olmasın: /work  (/work/ değil)
  trailingSlash: 'never',

  // Kullanıcı bir linkin üstüne gelince / ekrana girince sayfayı
  // arka planda önceden yükler -> fuarda tıklayınca anında açılır.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Saf statik site: Cloudflare Pages için adapter'a gerek yok.
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/cv'),
    }),
  ],
});
