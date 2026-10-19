type Point = { x: number; y: number };
import type { MimoPose, MimoAction } from './MimoMotion';
type Motion = Pick<MimoPose, 'arm' | 'clipboard' | 'clipboardLift' | 'headTilt' | 'headY' | 'leftFoot' | 'rightFoot'>;
export const RIG_PADDING = 72;
export const RIG_XS = [
  0, 120, 180, 220, 260, 300, 400, 600, 760, 820, 860, 900, 940, 980, 1020,
  1080, 1160, 1226,
];
export const RIG_YS = [
  0, 250, 400, 450, 500, 550, 610, 660, 700, 740, 780, 840, 900, 960, 1040,
  1100, 1200, 1283,
];
const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const rotate = (p: Point, x: number, y: number, degrees: number): Point => {
  const angle = (degrees * Math.PI) / 180,
    dx = p.x - x,
    dy = p.y - y;
  return {
    x: x + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: y + dx * Math.sin(angle) + dy * Math.cos(angle),
  };
};
const getUnmirroredRigPoint = (p: Point, motion: Motion, action: MimoAction = 'doctor'): Point => {
  // Continuous sleeve weights keep connected texture, with rigid hands/clipboard away from joints.
  const original = action === 'doctor';
  const raised = action === 'welcome' || action === 'visit';
  const left = original ?
    (1 - smooth(180, 255, p.x)) *
    smooth(360, 450, p.y) *
    (1 - smooth(740, 820, p.y)) :
    (action === 'faq' ? 0 : (1 - smooth(280, 430, p.x)) * smooth(220, 300, p.y) * (1 - smooth(raised ? 640 : 700, raised ? 760 : 850, p.y)));
  // Shoulder falloffs keep sleeve and clipboard attached to the original artwork.
  const shoulder =
    p.x <= 1000
      ? 720 - (Math.max(0, p.x - 820) * 145) / 180
      : 575 + ((p.x - 1000) * 75) / 226;
  const right =
    smooth(820, 910, p.x) *
    smooth(shoulder, shoulder + 60, p.y) *
    (1 - smooth(1050, 1130, p.y));
  const a = rotate(p, original ? 235 : 390, 660, motion.arm),
    b = rotate(p, 1005, 670, motion.clipboard);
  // Move the face as one piece; blend the motion below the neckline.
  const head = smooth(175, 270, p.x) * (1 - smooth(1020, 1110, p.x)) * (1 - smooth(550, 720, p.y));
  const h = rotate(p, 620, 620, motion.headTilt);
  const foot = smooth(1070, 1170, p.y);
  const split = smooth(610, 640, p.x);
  return {
    x: p.x + (a.x - p.x) * left + (b.x - p.x) * right + (h.x - p.x) * head + RIG_PADDING,
    y:
      p.y +
      (a.y - p.y) * left +
      (b.y - p.y - motion.clipboardLift) * right +
      (h.y - p.y + motion.headY) * head -
      (motion.leftFoot * (1 - split) + motion.rightFoot * split) * foot +
      RIG_PADDING,
  };
};
export const getRigPoint = (p: Point, motion: Motion, action: MimoAction = 'doctor'): Point => {
  if (action === 'care' || action === 'booking') {
    const result = getUnmirroredRigPoint({ x: 1226 - p.x, y: p.y }, motion, action);
    return { x: 1226 + 2 * RIG_PADDING - result.x, y: result.y };
  }
  return getUnmirroredRigPoint(p, motion, action);
};
const triangle = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  source: Point[],
  dest: Point[],
) => {
  const [a, b, c] = source,
    [u, v, w] = dest;
  const bx = b.x - a.x,
    by = b.y - a.y,
    cx = c.x - a.x,
    cy = c.y - a.y,
    det = bx * cy - by * cx;
  const ma = ((v.x - u.x) * cy - (w.x - u.x) * by) / det;
  const mc = ((w.x - u.x) * bx - (v.x - u.x) * cx) / det;
  const mb = ((v.y - u.y) * cy - (w.y - u.y) * by) / det;
  const md = ((w.y - u.y) * bx - (v.y - u.y) * cx) / det;
  const center = { x: (u.x + v.x + w.x) / 3, y: (u.y + v.y + w.y) / 3 };
  ctx.save();
  ctx.beginPath();
  // A subpixel overlap prevents raster hairlines between adjacent texture triangles.
  for (const [i, p] of dest.entries()) {
    const dx = p.x - center.x,
      dy = p.y - center.y,
      length = Math.hypot(dx, dy);
    const x = p.x + (dx / length) * 0.65,
      y = p.y + (dy / length) * 0.65;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.clip();
  ctx.setTransform(
    ma,
    mb,
    mc,
    md,
    u.x - ma * a.x - mc * a.y,
    u.y - mb * a.x - md * a.y,
  );
  ctx.drawImage(image, 0, 0);
  ctx.restore();
};
export const drawCharacterRig = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  motion: Motion,
  action: MimoAction = 'doctor',
) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const points = RIG_YS.map(y => RIG_XS.map(x => getRigPoint({ x, y }, motion, action)));
  for (let y = 0; y < RIG_YS.length - 1; y++)
    for (let x = 0; x < RIG_XS.length - 1; x++) {
      const a = { x: RIG_XS[x], y: RIG_YS[y] },
        b = { x: RIG_XS[x + 1], y: RIG_YS[y] },
        c = { x: RIG_XS[x], y: RIG_YS[y + 1] },
        d = { x: RIG_XS[x + 1], y: RIG_YS[y + 1] };
      const da = points[y][x],
        db = points[y][x + 1],
        dc = points[y + 1][x],
        dd = points[y + 1][x + 1];
      triangle(ctx, image, [a, b, c], [da, db, dc]);
      triangle(ctx, image, [b, d, c], [db, dd, dc]);
    }
};

