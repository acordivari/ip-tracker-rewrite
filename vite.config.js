import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the built site works both at a domain root and
  // under a GitHub Pages project path (e.g. /ip-tracker/).
  base: './',
});
