import { type ReactNode } from 'react';
/**
 * One panel for every page that cannot show what was asked for (v0.14): not found, private,
 * signed out, failed, empty. Art, a title, the reason, a primary and a secondary way on, and a
 * hint line. It sits inside the page shell, so the rail and Back stay.
 *
 *   full     centred in the page, art above (a page that has nothing else to show)
 *   compact  a card with a small glyph on the left (a section of a page, or a strip of states)
 */
export interface StatePanelAction {
    label: string;
    onPress: () => void;
}
export declare function StatePanel({ title, body, art, glyph, primary, secondary, hint, compact, }: {
    title: string;
    body?: string;
    /** The picture above the title in the full panel (`PocketsArt`, a mascot). */
    art?: ReactNode;
    /** A one-character mark for the compact card. */
    glyph?: string;
    primary?: StatePanelAction;
    secondary?: StatePanelAction;
    /** A line under the buttons (a sign-in hint). Text or a node with its own link. */
    hint?: ReactNode;
    compact?: boolean;
}): import("react").JSX.Element;
/**
 * The empty binder page: a 3x3 of dashed pockets on a card, with an optional round badge
 * (a lock for private, ? for not found) at its lower right.
 */
export declare function PocketsArt({ badge, size }: {
    badge?: 'lock' | string | ReactNode;
    size?: number;
}): import("react").JSX.Element;
