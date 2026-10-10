import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://deadbutt.fyi',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
