// Asset utilities to map .webp assets to their .jpg fallbacks.
// Vite will resolve these during build.

// Import all jpg assets under images/ as an eager map
const jpgModules = import.meta.glob('/src/assets/images/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}', {
  eager: true,
  query: '?url',
}) as Record<string, { default: string } | string>;

// Build a quick lookup by filename (without extension)
const jpgByBase = new Map<string, string>();
for (const [path, mod] of Object.entries(jpgModules)) {
  const url = (typeof mod === 'string' ? mod : (mod as any).default) as string;
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
  jpgByBase.set(base, url);
}

/**
 * Given a .webp URL (imported) return a matching jpg/png fallback URL if present.
 * Matching is based on the basename (filename without extension).
 */
export function getFallbackFor(webpUrl: string | undefined): string | undefined {
  if (!webpUrl) return undefined;
  try {
    const base = new URL(webpUrl, 'http://local/').pathname.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
    return jpgByBase.get(base);
  } catch {
    // In dev with Vite URLs, fallback to naive parsing
    const parts = webpUrl.split('?')[0].split('/');
    const last = parts[parts.length - 1] || '';
    const base = last.replace(/\.[^.]+$/, '').toLowerCase();
    return jpgByBase.get(base);
  }
}
