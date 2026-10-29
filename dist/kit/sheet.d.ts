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
export declare function Sheet({ visible, title, onClose, actions, children, }: {
    visible: boolean;
    title: string;
    onClose: () => void;
    actions?: readonly SheetAction[];
    children: ReactNode;
}): import("react").JSX.Element;
/** The 72 button row shared by sheets and dialogs: equal-width buttons, 12 apart. */
export declare function ButtonRow({ actions, bordered }: {
    actions: readonly SheetAction[];
    bordered?: boolean;
}): import("react").JSX.Element;
