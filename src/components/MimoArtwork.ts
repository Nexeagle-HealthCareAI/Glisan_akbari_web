import type { MimoAction } from './MimoMotion';

const images = new Map<string, Promise<HTMLImageElement>>();
function load(src: string) {
  if (!images.has(src)) images.set(src, new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  }));
  return images.get(src)!;
}

// Sprite bounds include a little transparent clearance; no background or adjacent pose.
const frames: Record<Exclude<MimoAction, 'doctor'>, [number, number, number, number]> = {
  welcome: [25, 5, 475, 495],
  care: [520, 5, 495, 495],
  booking: [30, 513, 472, 485],
  faq: [635, 513, 380, 485],
  visit: [1050, 513, 455, 485],
};
const artwork = new Map<MimoAction, Promise<HTMLCanvasElement>>();
export function loadMimoArtwork(action: MimoAction) {
  if (!artwork.has(action)) artwork.set(action, (async () => {
    const original = action === 'doctor';
    const image = await load(original ? '/media/mimo-original.png' : '/media/mimo-poses.png');
    const canvas = document.createElement('canvas');
    canvas.width = 1226; canvas.height = 1283;
    const context = canvas.getContext('2d')!;
    if (original) context.drawImage(image, 0, 0, 1226, 1283);
    else {
      const [x, y, width, height] = frames[action];
      const scale = Math.min(1180 / width, 1250 / height);
      const w = width * scale, h = height * scale;
      // Face the explanatory cards on the right without changing section layout.
      if (action === 'care' || action === 'booking') {
        context.translate(1226, 0); context.scale(-1, 1);
      }
      context.drawImage(image, x, y, width, height, (1226 - w) / 2, 1270 - h, w, h);
    }
    return canvas;
  })());
  return artwork.get(action)!;
}
