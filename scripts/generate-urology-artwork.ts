import './load-build-env';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { PRIORITY_UROLOGY } from '../src/data/priorityUrology';

// Simplified topic symbols, not anatomical or diagnostic diagrams.
const kidneys = '<path d="M280 170c-75-24-112 39-91 106 16 48 73 62 102 27 19-24-25-36-20-66 6-29 38-54 9-67Z"/><path d="M520 170c75-24 112 39 91 106-16 48-73 62-102 27-19-24 25-36 20-66-6-29-38-54-9-67Z"/>';
const bladder = '<path d="M324 171c-59 9-81 55-49 92 26 30 54 28 62 62h30c9-34 37-32 62-62 32-37 10-83-49-92Z"/><path d="M352 322v67" fill="none"/>';
const symbols: Record<string, string> = {
  'srv-1': kidneys + '<path d="M305 262q55 17 63 90m127-90q-55 17-63 90" fill="none"/><path d="m292 236 15-18 24 8 3 24-20 12-22-9Z" fill="#e6b455" stroke="#173e35"/>',
  'srv-2': bladder + '<ellipse cx="352" cy="330" rx="46" ry="24" fill="#f3b492"/><path d="M352 305v60" fill="none" stroke="#173e35"/><path d="M455 330h100m-20-20 20 20-20 20" fill="none"/>',
  'srv-3': bladder + '<path d="M484 189h67v125q0 35-33 35t-34-35Z" fill="#fffaf2"/><path d="M485 278h65v37q0 30-32 30t-33-30Z" fill="#e6b455" stroke="none"/><path d="M474 189h87" fill="none"/>',
  'srv-4': '<ellipse cx="325" cy="207" rx="28" ry="43" transform="rotate(-28 325 207)"/><path d="M340 243c87 65-37 52 75 96" fill="none"/><circle cx="495" cy="260" r="76" fill="#fffaf2"/><path d="m456 259 26 27 48-53" stroke="#3d785e" fill="none"/>',
  'srv-7': '<rect x="255" y="155" width="214" height="240" rx="24" fill="#fffaf2"/><path d="M310 168v-23h105v23" fill="none"/><path d="M286 265h32l23-45 36 90 25-45h35" fill="none"/><circle cx="511" cy="319" r="58" fill="#f3b492"/><path d="m487 319 18 18 31-37" fill="none"/>',
};
for (const item of Object.values(PRIORITY_UROLOGY)) {
  const source = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" rx="28" fill="#f5eddf"/><circle cx="400" cy="264" r="198" fill="#e3ecda"/><g fill="#f3b492" stroke="#3d785e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">${symbols[item.id]}</g><text x="400" y="500" text-anchor="middle" fill="#173e35" font-family="sans-serif" font-size="25">${item.category.replaceAll('&', '&amp;')}</text><text x="400" y="546" text-anchor="middle" fill="#68766f" font-family="sans-serif" font-size="16">GLISAN AKBARI · PURNIA</text></svg>`;
  fs.writeFileSync(path.join('public', item.featuredImage!.src), source);
  await sharp(Buffer.from(source)).png().toFile(path.join('public', item.featuredImage!.social));
}
console.log('Generated five topical SVG illustrations and PNG share images.');
