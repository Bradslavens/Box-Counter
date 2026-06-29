#!/usr/bin/env node
/**
 * Generates PNG icons from the SVG source.
 * Run: node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = join(root, 'icons');
const svgPath = join(iconsDir, 'icon.svg');

mkdirSync(iconsDir, { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#1a1a2e"/>
  <path d="M96 176 L256 96 L416 176 L416 368 L256 448 L96 368 Z" fill="#e94560"/>
  <path d="M256 96 L256 448" stroke="#c73a52" stroke-width="8"/>
  <path d="M96 176 L256 256 L416 176" stroke="#c73a52" stroke-width="8" fill="none"/>
  <path d="M256 256 L256 368" stroke="#c73a52" stroke-width="8"/>
</svg>`;

writeFileSync(svgPath, svg);

const sizes = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];

try {
  for (const [name, size] of sizes) {
    execSync(
      `convert -background none "${svgPath}" -resize ${size}x${size} "${join(iconsDir, name)}"`,
      { stdio: 'inherit' },
    );
  }
  console.log('Icons generated with ImageMagick.');
} catch {
  console.warn('ImageMagick unavailable — copy icon-512.png manually for other sizes.');
}
