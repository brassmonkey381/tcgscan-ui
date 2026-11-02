import { Animated } from 'react-native';
/**
 * One motion ladder for every animation (owner's picks, 2026-11-02): a press takes 120 ms, a state
 * change 200 ms, something arriving or leaving 320 ms, all easing out (fast start, gentle stop).
 * With the phone's Reduce Motion on, every move is instant; fades stay, kept under 150 ms.
 */
export declare const Motion: {
    readonly press: 120;
    readonly state: 200;
    readonly arrive: 320;
};
export type MotionKind = keyof typeof Motion;
export declare const motionEasing: import("react-native").EasingFunction;
/** True while the phone asks for reduced motion. */
export declare function useReduceMotion(): boolean;
/**
 * Runs one step of the ladder on an Animated.Value. `fade` marks an opacity-only change, which
 * survives Reduce Motion (shortened); anything that moves becomes instant.
 */
export declare function animate(value: Animated.Value, toValue: number, kind: MotionKind, { reduce, fade, nativeDriver }: {
    reduce: boolean;
    fade?: boolean;
    nativeDriver?: boolean;
}): Animated.CompositeAnimation;
