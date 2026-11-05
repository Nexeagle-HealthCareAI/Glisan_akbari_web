import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Extract the four generated editorial illustrations and create delivery sizes.
// The original image is retained unchanged. Pass its path as the first argument.
const source = process.argv[2];
if (!source) throw new Error('Pass the generated four-panel illustration source path.');
const { width, height } = await sharp(source).metadata();
if (!width || !height) throw new Error('Unable to read source image dimensions.');
const output = path.resolve('public/media/care-spaces');
await fs.mkdir(output, { recursive: true });
const panels = [
  ['icu', 0, 0], ['hdu', 1, 0], ['private-room', 0, 1], ['doctors-consultation', 1, 1],
];
for (const [name, column, row] of panels) {
  // Remove the sheet's fine separator lines, then preserve each scene's framing.
  const crop = {
    left: Math.floor(width / 2) * column + 2,
    top: Math.floor(height / 2) * row + 2,
    width: Math.floor(width / 2) - 4,
    height: Math.floor(height / 2) - 4,
  };
  for (const deliveryWidth of [480, 800, 1200]) {
    const suffix = deliveryWidth === 1200 ? '' : `-${deliveryWidth}`;
    const filename = `${name}${suffix}.webp`;
    await sharp(source).extract(crop).resize(deliveryWidth, Math.round(deliveryWidth * 2 / 3), { fit: 'cover' })
      .webp({ quality: 78, effort: 6 }).toFile(path.join(output, filename));
    const { size } = await fs.stat(path.join(output, filename));
    console.log(`${filename}: ${(size / 1024).toFixed(1)} KiB`);
  }
}
