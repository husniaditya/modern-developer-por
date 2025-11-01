#!/usr/bin/env node
// Convert all .webp images under src/assets/images to .jpg if a jpg doesn't already exist.
// Requires the 'sharp' package. Intended to be run locally or in CI before build.
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_DIR = join(ROOT, 'src', 'assets', 'images');

/** Recursively walk a directory and return file paths */
function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

async function main() {
  try {
    const files = walk(IMAGES_DIR).filter((p) => p.toLowerCase().endsWith('.webp'));
    let converted = 0;
    for (const webpPath of files) {
      const { dir, name } = parse(webpPath);
      const jpgPath = join(dir, `${name}.jpg`);
      if (existsSync(jpgPath)) continue; // skip if already present
      const buf = await sharp(webpPath).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      writeFileSync(jpgPath, buf);
      converted++;
      console.log(`[fallback] Created ${jpgPath}`);
    }
    console.log(`[fallback] Completed. New JPEGs: ${converted}`);
  } catch (err) {
    console.error('[fallback] Error:', err);
    process.exitCode = 1;
  }
}

main();
