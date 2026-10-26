import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { DOCTOR_NAME, HOSPITAL_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from './src/data/identity';
import { PRERENDER_ROUTES } from './src/data/seo';
import { getRouteRedirect } from './src/data/routes';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'prerendered-preview-routes',
        configurePreviewServer(server) {
          // Vite's SPA fallback otherwise serves homepage HTML for /services,
          // causing a hydration mismatch before React renders the correct page.
          server.middlewares.use((request, response, next) => {
            const url = new URL(request.url || '/', 'http://localhost');
            const route = url.pathname.replace(/\/+$/, '') || '/';
            const redirect = getRouteRedirect(url.pathname, url.search);
            if (redirect) {
              response.writeHead(301, { Location: redirect });
              response.end();
              return;
            }
            if (route !== '/' && PRERENDER_ROUTES.includes(route)) {
              request.url = (route === '/404' ? '/404.html' : route + '/index.html') + url.search;
              if (route === '/404') response.statusCode = 404;
            } else if (route !== '/' && !route.split('/').pop()?.includes('.')) {
              request.url = '/404.html' + url.search;
              response.statusCode = 404;
            }
            next();
          });
        },
      },
      {
        name: 'html-transform-identity',
        transformIndexHtml(html) {
          return html
            .replace(/__DOCTOR_NAME__/g, DOCTOR_NAME)
            .replace(/__HOSPITAL_NAME__/g, HOSPITAL_NAME)
            .replace(/__HOSPITAL_CITY__/g, HOSPITAL_CITY)
            .replace(/__HOSPITAL_SHORT_ADDRESS__/g, HOSPITAL_SHORT_ADDRESS);
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
