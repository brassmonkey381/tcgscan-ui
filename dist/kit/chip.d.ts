import type { ReactNode } from 'react';
/**
 * A filter or sort chip. Always the small height; selected is the accent fill. On a lipped skin it
 * stands on the lip like a button, because it is one (owner, 2026-10-30).
 */
export declare function Chip({ label, selected, onPress, }: {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}): import("react").JSX.Element;
/** A row of chips: wraps at 8, never scrolls sideways. */
export declare function ChipRow({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
