import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const manifestPath = join(dirname(fileURLToPath(import.meta.url)), '../manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

describe('manifest.json', () => {
  it('has required PWA fields', () => {
    expect(manifest.name).toBe('Box Counter');
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBe('./');
    expect(manifest.display).toBe('standalone');
    expect(manifest.background_color).toBeTruthy();
    expect(manifest.theme_color).toBeTruthy();
  });

  it('includes install icons', () => {
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
    expect(manifest.icons.some((icon) => icon.sizes === '192x192')).toBe(true);
    expect(manifest.icons.some((icon) => icon.sizes === '512x512')).toBe(true);
  });
});
