import type { ReactNode } from 'react';
/** A filter or sort chip. Always the small height; selected is the accent fill. */
export declare function Chip({ label, selected, onPress, }: {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}): import("react").JSX.Element;
/** A row of chips: wraps at 8, never scrolls sideways. */
export declare function ChipRow({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
