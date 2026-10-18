import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';

function sanitizeMalformedRequestUrls(): Plugin {
  return {
    name: 'sanitize-malformed-request-urls',
    configureServer(server) {
      server.middlewares.use((req: { url?: string }, _res, next) => {
        if (!req.url) {
          next();
          return;
        }

        const parsed = new URL(req.url, 'http://localhost');
        try {
          decodeURI(parsed.pathname);
        } catch {
          parsed.pathname = parsed.pathname.replace(/%/g, '%25');
          req.url = `${parsed.pathname}${parsed.search}`;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    sanitizeMalformedRequestUrls(),
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter(),
      alias: {
        $types: 'src/types',
        $lib: 'src/lib',
      },
    }),
    svelteTesting(),
  ],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
