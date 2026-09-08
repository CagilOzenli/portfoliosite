/**
 * Sanity görselleri için URL üreticisi.
 * Kullanım:  thumbUrl(project.coverImage, 1200, 750)
 */
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from './types';
import { projectId, dataset } from './sanity';

const builder = createImageUrlBuilder({ projectId, dataset });

type Builder = ReturnType<typeof builder.image>;

export function urlFor(source: SanityImage | undefined | null): Builder | null {
  if (!source || !source.asset) return null;
  return builder.image(source as never);
}

/**
 * Kart / thumbnail için hazır bir URL döndürür (yoksa null).
 * `null` dönerse component greybox placeholder gösterir.
 * height 0/undefined -> en-boy oranını koru.
 */
export function thumbUrl(
  source: SanityImage | undefined | null,
  width = 1200,
  height = 750,
): string | null {
  const b = urlFor(source);
  if (!b) return null;
  let img = b.width(width).auto('format');
  if (height) img = img.height(height).fit('crop');
  return img.url();
}

/**
 * YouTube video ID -> kapak görseli URL'i.
 * `maxresdefault` (1280×720, 16:9, siyah bant yok) dener; yüklenmezse
 * çağıran taraf `youtubeThumbFallback` (hqdefault, her zaman var) ile onerror
 * fallback yapmalı.
 */
export function youtubeThumb(id: string | undefined | null): string | null {
  const v = (id ?? '').trim();
  return v ? `https://i.ytimg.com/vi/${v}/maxresdefault.jpg` : null;
}

/** Her zaman var olan düşük çözünürlüklü YouTube kapağı (4:3, hafif siyah bant). */
export function youtubeThumbFallback(id: string | undefined | null): string | null {
  const v = (id ?? '').trim();
  return v ? `https://i.ytimg.com/vi/${v}/hqdefault.jpg` : null;
}

/** Görselin alt metni (CMS'te doldurulmuşsa) */
export function imageAlt(source: SanityImage | undefined | null, fallback = ''): string {
  return source?.alt?.trim() || fallback;
}
