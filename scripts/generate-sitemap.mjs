#!/usr/bin/env node
/*
  Simple sitemap generator for SPA portfolios.
  Uses VITE_SITE_URL env (or SITE_URL) for absolute URLs.
*/
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'http://localhost:5173';
const now = new Date().toISOString();

// Minimal set of routes for SPA
const routes = [
  '/',
];

const urlset = routes
  .map((path) => {
    const loc = new URL(path, SITE_URL).toString();
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>\n`;

const outDir = resolve(process.cwd(), 'dist');
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, 'sitemap.xml');
writeFileSync(outFile, xml, 'utf-8');

console.log(`[sitemap] Wrote ${outFile} with ${routes.length} routes to ${SITE_URL}`);

// Also emit a robots.txt that points to the sitemap and allows all crawlers
const robots = `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', SITE_URL).toString()}\n`;
const robotsFile = resolve(outDir, 'robots.txt');
writeFileSync(robotsFile, robots, 'utf-8');
console.log(`[sitemap] Wrote ${robotsFile}`);
