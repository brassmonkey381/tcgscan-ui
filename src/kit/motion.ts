import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';

/**
 * One motion ladder for every animation (owner's picks, 2026-11-02): a press takes 120 ms, a state
 * change 200 ms, something arriving or leaving 320 ms, all easing out (fast start, gentle stop).
 * With the phone's Reduce Motion on, every move is instant; fades stay, kept under 150 ms.
 */
export const Motion = {
  press: 120,
  state: 200,
  arrive: 320,
} as const;

export type MotionKind = keyof typeof Motion;

export const motionEasing = Easing.out(Easing.cubic);

/** The fade length allowed under Reduce Motion. */
const REDUCED_FADE = 120;

let reduced = false;
const listeners = new Set<(on: boolean) => void>();
let watching = false;
function watch() {
  if (watching) return;
  watching = true;
  AccessibilityInfo.isReduceMotionEnabled?.().then((on) => {
    reduced = !!on;
    listeners.forEach((l) => l(reduced));
  }).catch(() => {});
  AccessibilityInfo.addEventListener?.('reduceMotionChanged', (on: boolean) => {
    reduced = !!on;
    listeners.forEach((l) => l(reduced));
  });
}

/** True while the phone asks for reduced motion. */
export function useReduceMotion(): boolean {
  const [on, setOn] = useState(reduced);
  useEffect(() => {
    watch();
    listeners.add(setOn);
    return () => {
      listeners.delete(setOn);
    };
  }, []);
  return on;
}

/**
 * Runs one step of the ladder on an Animated.Value. `fade` marks an opacity-only change, which
 * survives Reduce Motion (shortened); anything that moves becomes instant.
 */
export function animate(
  value: Animated.Value,
  toValue: number,
  kind: MotionKind,
  { reduce, fade, nativeDriver = false }: { reduce: boolean; fade?: boolean; nativeDriver?: boolean },
): Animated.CompositeAnimation {
  const duration = reduce ? (fade ? Math.min(REDUCED_FADE, Motion[kind]) : 0) : Motion[kind];
  return Animated.timing(value, { toValue, duration, easing: motionEasing, useNativeDriver: nativeDriver });
}
