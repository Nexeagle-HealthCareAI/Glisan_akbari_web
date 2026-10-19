export type MimoAction = 'welcome' | 'care' | 'doctor' | 'booking' | 'faq' | 'visit';
export type MimoPose = {
  x: number; y: number; tilt: number; turn: number; scale: number;
  arm: number; clipboard: number; clipboardLift: number;
  headTilt: number; headY: number; leftFoot: number; rightFoot: number;
};
type Beat = { at: number; pose: Partial<MimoPose> };
export const REST_POSE: MimoPose = {
  x: 0, y: 0, tilt: 0, turn: 0, scale: 1, arm: 0, clipboard: 0,
  clipboardLift: 0, headTilt: 0, headY: 0, leftFoot: 0, rightFoot: 0,
};

/** Deliberate gestures separated by holds; each section has its own performance. */
export const MIMO_ACTIONS: Record<MimoAction, { label: string; beats: Beat[] }> = {
  welcome: { label: 'Dr. Memo greets you with a double wave', beats: [
    { at: 0, pose: {} }, { at: .65, pose: { y: -2, tilt: -3, turn: -8, arm: -12, headTilt: 2 } },
    { at: 1.05, pose: { y: -2, tilt: -3, turn: -8, arm: 15, headTilt: 2 } },
    { at: 1.45, pose: { y: -2, tilt: -3, turn: -8, arm: -12, headTilt: 2 } },
    { at: 1.85, pose: { y: -2, tilt: -3, turn: -8, arm: 15, headTilt: 2 } },
    { at: 2.25, pose: { y: -1, tilt: -2, turn: -5, arm: -8 } },
    { at: 3.1, pose: {} }, { at: 8.6, pose: {} },
  ] },
  care: { label: 'Dr. Memo leans toward the care graphic and presents it', beats: [
    { at: 0, pose: {} }, { at: .8, pose: { x: 3, tilt: 4, turn: 12, headTilt: -3, clipboard: -7, clipboardLift: 18 } },
    { at: 1.7, pose: { x: 3, tilt: 4, turn: 12, headTilt: -3, clipboard: -7, clipboardLift: 18, arm: 10 } },
    { at: 2.1, pose: { x: 3, tilt: 4, turn: 12, headTilt: -3, clipboard: -7, clipboardLift: 18, arm: 10 } },
    { at: 3, pose: { x: 1, tilt: 1.5, turn: 5, headTilt: 1, arm: -5, clipboard: -2 } },
    { at: 3.7, pose: { x: 1, tilt: 1.5, turn: 5, arm: 4, headY: 8 } },
    { at: 4.5, pose: {} }, { at: 10.2, pose: {} },
  ] },
  doctor: { label: 'Dr. Memo gives a reassuring thumbs-up and nods', beats: [
    { at: 0, pose: {} }, { at: .85, pose: { x: -2, turn: -12, tilt: -2, headTilt: -3, arm: -4 } },
    { at: 1.3, pose: { x: -2, turn: -12, tilt: -2, headTilt: -3, headY: 17, clipboard: 3 } },
    { at: 1.8, pose: { x: -2, turn: -12, tilt: -2, headTilt: -3, headY: -5 } },
    { at: 2.25, pose: { x: -2, turn: -12, tilt: -2, headTilt: -3, headY: 14 } },
    { at: 2.8, pose: { x: -2, turn: -12, tilt: -2, headTilt: -3, arm: 7 } },
    { at: 3.8, pose: { x: -1, turn: -6, tilt: -1, arm: 3 } },
    { at: 5, pose: {} }, { at: 11.5, pose: {} },
  ] },
  booking: { label: 'Dr. Memo points out the booking steps', beats: [
    { at: 0, pose: {} }, { at: .75, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, headTilt: 3 } },
    { at: 1.35, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, headY: 11, arm: 12 } },
    { at: 1.8, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, arm: 2 } },
    { at: 2.4, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, headY: 9, arm: 12 } },
    { at: 3, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, arm: 2 } },
    { at: 3.6, pose: { x: 2, turn: 10, tilt: 2, clipboard: -7, clipboardLift: 18, headY: 7, arm: 12 } },
    { at: 4.3, pose: { y: -2, tilt: -2, arm: 8, clipboard: -4, clipboardLift: 12 } },
    { at: 5.1, pose: {} }, { at: 10.8, pose: {} },
  ] },
  faq: { label: 'Dr. Memo rests a hand by his chin and listens thoughtfully', beats: [
    { at: 0, pose: {} }, { at: .9, pose: { tilt: -2.5, turn: -7, headTilt: -5, arm: -7, clipboard: 4 } },
    { at: 2, pose: { tilt: -2.5, turn: -7, headTilt: -5, arm: -7, clipboard: 4 } },
    { at: 2.85, pose: { x: 1, tilt: 2.5, turn: 8, headTilt: 4, clipboard: -3 } },
    { at: 3.4, pose: { x: 1, tilt: 2.5, turn: 8, headTilt: 4, arm: 13, clipboard: -3, headY: 8 } },
    { at: 4.1, pose: { x: 1, tilt: 2.5, turn: 8, arm: 13, clipboard: -3 } },
    { at: 5, pose: {} }, { at: 12.1, pose: {} },
  ] },
  visit: { label: 'Dr. Memo takes two little steps, then waves goodbye', beats: [
    { at: 0, pose: {} },
    { at: .55, pose: { x: 1.5, y: -1, tilt: -3, turn: -10, leftFoot: 22, rightFoot: -6, arm: -5 } },
    { at: 1.05, pose: { x: 3, tilt: 3, turn: -10, rightFoot: 22, leftFoot: -6, arm: 4 } },
    { at: 1.55, pose: { x: 4, tilt: -2, turn: -10, leftFoot: 15, arm: -3 } },
    { at: 2, pose: { x: 4, tilt: -2, turn: -6, arm: -12 } },
    { at: 2.5, pose: { x: 4, tilt: -2, turn: -6, arm: 15, headTilt: 3 } },
    { at: 3, pose: { x: 4, tilt: -2, turn: -6, arm: -12, headTilt: 3 } },
    { at: 3.5, pose: { x: 4, tilt: -2, turn: -6, arm: 15 } },
    { at: 4.5, pose: { x: 4 } }, { at: 6, pose: { x: 4 } },
    { at: 6.7, pose: { x: 2.5, tilt: 2, turn: 8, rightFoot: 17 } },
    { at: 7.3, pose: { x: 1, tilt: -2, turn: 8, leftFoot: 17 } },
    { at: 8, pose: {} }, { at: 14, pose: {} },
  ] },
};
export function getMimoPose(action: MimoAction, seconds: number): MimoPose {
  const beats = MIMO_ACTIONS[action].beats;
  const end = beats[beats.length - 1].at;
  const t = ((seconds % end) + end) % end;
  let index = 0;
  while (index < beats.length - 2 && beats[index + 1].at < t) index++;
  const a = beats[index], b = beats[index + 1];
  const progress = Math.max(0, Math.min(1, (t - a.at) / (b.at - a.at)));
  const ease = progress * progress * (3 - 2 * progress);
  const from = { ...REST_POSE, ...a.pose }, to = { ...REST_POSE, ...b.pose };
  const result = { ...REST_POSE };
  for (const key of Object.keys(result) as (keyof MimoPose)[]) result[key] = from[key] + (to[key] - from[key]) * ease;
  return result;
}

