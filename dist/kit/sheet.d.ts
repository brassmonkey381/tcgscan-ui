import type { ReactNode } from 'react';
import { type ButtonLook } from './button';
export interface SheetAction {
    label: string;
    onPress: () => void;
    look?: ButtonLook;
    tone?: 'danger';
    disabled?: boolean;
}
/**
 * A sheet: title row 56, body, button row 72. Buttons live in the bottom row and nowhere else,
 * equal width, 12 apart, safe choice first and the primary last.
 *
 * Bottom-anchored on a phone; a centred panel once the window has room for the rail.
 */
export declare function Sheet({ visible, title, onClose, actions, children, width, grabHandle, }: {
    visible: boolean;
    /** The title row's text; without one the row keeps only the X (v0.14). */
    title?: string;
    onClose: () => void;
    actions?: readonly SheetAction[];
    children: ReactNode;
    /** The centred panel's width once the window is wide (default SheetSize.maxWidth; 720 for a wide sheet). */
    width?: number;
    /** A grab handle above the title row on a phone (v0.14). Off by default so existing sheets look the same. */
    grabHandle?: boolean;
}): import("react").JSX.Element;
/** The 72 button row shared by sheets and dialogs: equal-width buttons, 12 apart. */
export declare function ButtonRow({ actions, bordered }: {
    actions: readonly SheetAction[];
    bordered?: boolean;
}): import("react").JSX.Element;
/** The X every pop-up closes with (sheets, dialogs): 36 square, the panel grey, no 'Close' text. */
export declare function CloseButton({ onPress }: {
    onPress: () => void;
}): import("react").JSX.Element;
