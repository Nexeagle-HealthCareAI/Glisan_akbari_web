import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../src/data/identity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Favicon SVG - teal square matching header emblem (#115e59) with "Dr" in white
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" rx="36" fill="#115e59"/>
  <text x="90" y="118" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="84" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="-2">Dr</text>
</svg>`;

// 2. OpenGraph Image SVG (1200 x 630) - clean and simple, teal and white
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#042f2e" />
      <stop offset="60%" stop-color="#115e59" />
      <stop offset="100%" stop-color="#0f766e" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative subtle grid circles -->
  <circle cx="1120" cy="80" r="280" fill="#14b8a6" fill-opacity="0.12" filter="blur(40px)"/>
  <circle cx="80" cy="560" r="240" fill="#0d9488" fill-opacity="0.16" filter="blur(40px)"/>

  <!-- Inner content border container -->
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="url(#cardGrad)" stroke="#5eead4" stroke-opacity="0.25" stroke-width="2"/>

  <!-- Header Logo Emblem -->
  <g transform="translate(96, 96)">
    <rect width="84" height="84" rx="20" fill="#ffffff"/>
    <text x="42" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#115e59" text-anchor="middle" letter-spacing="-1">Dr</text>
  </g>

  <!-- Hospital Subtitle Tag -->
  <g transform="translate(200, 114)">
    <rect width="360" height="38" rx="10" fill="#134e4a" fill-opacity="0.8"/>
    <text x="180" y="24" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#5eead4" text-anchor="middle" letter-spacing="1">UROLOGY CARE · ${HOSPITAL_CITY.toUpperCase()}</text>
  </g>

  <!-- Doctor Name Heading -->
  <text x="96" y="280" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1.5">${DOCTOR_NAME}</text>

  <!-- Specialty Line -->
  <text x="96" y="348" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700" fill="#5eead4">Urologist in ${HOSPITAL_CITY}</text>

  <!-- Subtle divider line -->
  <line x1="96" y1="390" x2="1104" y2="390" stroke="#5eead4" stroke-opacity="0.25" stroke-width="2" />

  <!-- Hospital Name & Location -->
  <text x="96" y="450" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${HOSPITAL_NAME}</text>
  <text x="96" y="495" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500" fill="#ccfbf1">Dharamshala Road, Ashiyana Colony, ${HOSPITAL_SHORT_ADDRESS}, Bihar</text>

  <!-- Call / Consultation badge on right -->
  <g transform="translate(840, 432)">
    <rect width="216" height="54" rx="16" fill="#ffffff"/>
    <text x="108" y="34" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#115e59" text-anchor="middle">Book Consultation</text>
  </g>
</svg>`;

async function main() {
  console.log('[Assets] Generating favicons and social share images in public/...');

  // 1. Write favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf-8');

  // 2. Generate apple-touch-icon.png (180x180)
  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 3. Generate favicon.png (32x32)
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.png'));

  // 4. Generate og-image.png (1200x630)
  await sharp(Buffer.from(ogImageSvg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('[Assets] Created:');
  console.log(' - public/favicon.svg');
  console.log(' - public/apple-touch-icon.png (180x180)');
  console.log(' - public/favicon.png (32x32)');
  console.log(' - public/og-image.png (1200x630)');
}

main().catch((err) => {
  console.error('[Assets] Error generating assets:', err);
  process.exit(1);
});
