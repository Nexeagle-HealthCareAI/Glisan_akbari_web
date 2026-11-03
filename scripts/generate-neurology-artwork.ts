import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { NEUROLOGY_SEO, NEUROLOGY_TOPICS, neurologyTopicImage } from '../src/data/neurology';

// Conceptual topic symbols, not diagnostic or anatomically exact diagrams.
const brain = '<path d="M350 168c-28-28-72-7-67 26-40 1-57 42-36 68-23 33-3 75 34 75 5 35 50 48 69 21m0-190c28-28 72-7 67 26 40 1 57 42 36 68 23 33 3 75-34 75-5 35-50 48-69 21m0-190v190M290 210c26-3 38 13 32 34m-40 43c26-7 43 9 42 28m86-105c-26-3-38 13-32 34m40 43c-26-7-43 9-42 28"/>';
const card = '<rect x="489" y="226" width="116" height="137" rx="18" fill="#fffaf2"/><path d="M515 258h64m-64 30h47m-47 30h55"/>';
const symbols: Record<string, string> = {
  overview: brain + '<path d="M350 365v40m0-12-35 25m35-25 35 25"/>',
  'neurology-1': '<circle cx="300" cy="242" r="80" fill="#f4d1bc"/><path d="M270 225h3m55 0h3m-61 54c26-21 40 0 59-16"/><path d="M450 324v-75q0-16 16-16t16 16v34-69q0-16 16-16t16 16v68-58q0-16 16-16t16 16v58-37q0-16 16-16t16 16v81q0 63-63 63t-65-61Z"/><path d="M226 362h117m-117 22h86"/>',
  'neurology-2': brain + card + '<path d="m240 164-23-15m20 40-30-1m218-18 25-20" stroke="#bc663f"/>',
  'neurology-3': brain + '<path d="M464 265h26l18-38 25 80 21-48h50" stroke="#bc663f"/>',
  'neurology-4': '<path d="M285 331v-87q0-17 17-17t17 17v40-85q0-17 17-17t17 17v84-70q0-17 17-17t17 17v71-46q0-17 17-17t17 17v94q0 76-68 76t-68-77Z" fill="#f4d1bc"/><path d="M353 365v-92m0 55-35-25m35 8 33-30m-33 67 37-21"/><path d="M475 235h74m-74 40h49m-49 40h65" stroke="#bc663f"/>',
  'neurology-5': brain + card + '<circle cx="546" cy="184" r="22" fill="#f4d1bc"/><path d="m537 183 7 7 13-16"/>',
};
const folder = path.resolve('public/media/neurology');
fs.mkdirSync(folder, { recursive: true });
const items = [
  { image: NEUROLOGY_SEO.image, label: 'Brain, spine & nerve questions', symbol: 'overview' },
  ...NEUROLOGY_TOPICS.map((topic) => ({ image: neurologyTopicImage(topic), label: topic.label, symbol: topic.id })),
];
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
for (const item of items) {
  // Leave approved 3D topic images untouched when rebuilding legacy symbols.
  if (!item.image.src.endsWith('.svg')) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><title>${escape(item.image.alt)}</title><rect width="800" height="600" rx="28" fill="#f5eddf"/><circle cx="400" cy="280" r="190" fill="#e3ecda"/><g fill="none" stroke="#3d785e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${symbols[item.symbol]}</g><text x="400" y="505" text-anchor="middle" fill="#173e35" font-family="sans-serif" font-size="25">${escape(item.label)}</text><text x="400" y="548" text-anchor="middle" fill="#173e35" font-family="sans-serif" font-size="16">GLISAN AKBARI · PURNIA</text></svg>`;
  fs.writeFileSync(path.join(folder, path.basename(item.image.src)), svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(folder, path.basename(item.image.social)));
}
console.log('Generated legacy neurology SVG illustrations where configured; approved 3D artwork retained.');
