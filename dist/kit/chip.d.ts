import { type ReactNode } from 'react';
/**
 * A filter or sort chip. Always the small height; selected is the accent fill. On a lipped skin it
 * stands on the lip like a button, because it is one (owner, 2026-10-30).
 *
 * Picking and unpicking fades the face, label and lip over the motion ladder's state step.
 * `tone: 'danger'` lights it in the danger tint instead (a mode that removes a safety, such as
 * Quick delete). `icon` leads the label. `role: 'switch'` makes it an on/off control for screen
 * readers (the collection toolbar modes); the default is a button with a selected state.
 */
export declare function Chip({ label, selected, onPress, tone, icon, role, }: {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    tone?: 'danger';
    icon?: ReactNode;
    role?: 'button' | 'switch';
}): import("react").JSX.Element;
/** A row of chips: wraps at 8, never scrolls sideways. */
export declare function ChipRow({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
