import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const values = loadEnv(mode, root, 'VITE_');
for (const key of ['VITE_SITE_URL', 'VITE_ALLOW_INDEXING']) {
  if (process.env[key] === undefined && values[key] !== undefined) process.env[key] = values[key];
}
