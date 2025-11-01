// Simple SEO helpers for SPA: set/update meta tags and inject JSON-LD

export type MetaInput = {
  title?: string;
  description?: string;
  url?: string;
  image?: string; // absolute or relative (will be resolved to absolute)
  siteName?: string;
  type?: string; // og:type
};

function ensureTag(tagName: string, attrs: Record<string, string>) {
  const selector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${CSS.escape(v)}"]`)
    .join("");
  let el = document.head.querySelector(`${tagName}${selector}`) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = document.createElement(tagName) as HTMLMetaElement | HTMLLinkElement;
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

export function setMetaTags(meta: MetaInput) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const abs = (v?: string) => (v && /^https?:\/\//i.test(v) ? v : v ? new URL(v, origin).toString() : undefined);

  if (meta.title) document.title = meta.title;
  if (meta.description) ensureTag('meta', { name: 'description', content: meta.description });

  const url = abs(meta.url ?? window.location.href);
  const image = abs(meta.image);
  const siteName = meta.siteName ?? document.title;
  const type = meta.type ?? 'website';

  if (url) ensureTag('link', { rel: 'canonical', href: url });

  // Open Graph
  if (siteName) ensureTag('meta', { property: 'og:site_name', content: siteName });
  if (meta.title) ensureTag('meta', { property: 'og:title', content: meta.title });
  if (meta.description) ensureTag('meta', { property: 'og:description', content: meta.description });
  if (url) ensureTag('meta', { property: 'og:url', content: url });
  if (type) ensureTag('meta', { property: 'og:type', content: type });
  if (image) ensureTag('meta', { property: 'og:image', content: image });

  // Twitter Cards
  ensureTag('meta', { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });
  if (meta.title) ensureTag('meta', { name: 'twitter:title', content: meta.title });
  if (meta.description) ensureTag('meta', { name: 'twitter:description', content: meta.description });
  if (image) ensureTag('meta', { name: 'twitter:image', content: image });
}

export function injectJsonLd(id: string, data: unknown) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  const el = existing ?? document.createElement('script');
  if (!existing) {
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
