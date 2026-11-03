import React from 'react';
import type { MimoAction } from './MimoMotion';
import { MemoCharacter, type MemoPose } from './MemoCharacter';

const actionPoses: Record<MimoAction, MemoPose> = {
  welcome: 'happy', care: 'explaining', doctor: 'thinking',
  booking: 'happy', faq: 'thinking', visit: 'explaining',
};

export function MimoGuide({ paused, action = 'welcome', pose, cue = 0, className = '' }: {
  paused: boolean; action?: MimoAction; pose?: MemoPose; cue?: number; className?: string;
}) {
  return <MemoCharacter pose={pose || actionPoses[action]} paused={paused} cue={cue}
    className={`mm-mimo ${className}`} />;
}
