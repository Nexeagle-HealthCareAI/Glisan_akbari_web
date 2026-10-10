import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { DOCTOR_NAME, HOSPITAL_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from './src/data/identity';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
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
        '@': path.resolve(__dirname, '.'),
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
