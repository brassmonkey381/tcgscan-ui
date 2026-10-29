import type { ReactNode } from 'react';
import { type FrameWidth } from '../kit';
/**
 * The three header shapes. A route picks one; nothing else about the header varies.
 *
 *   doc        eyebrow (the rail group), h1, one-line lede, hairline below.    How-to, Plans.
 *   hero       centred: accent eyebrow, h1 40, lede, primary + secondary.     Landing-ish pages.
 *   workbench  h1 + lede left, search + secondary + primary right, chips under. Browse, lists.
 *              `actions` (small controls sized by themselves) close the title line at every width.
 */
export type HeaderVariant = 'doc' | 'hero' | 'workbench';
/** The column width each header implies. The page never picks its own. */
export declare const HEADER_WIDTH: Record<HeaderVariant, FrameWidth>;
export interface HeaderAction {
    label: string;
    onPress: () => void;
    /** A destructive page action (delete this collection): the danger tone, never the primary look. */
    tone?: 'danger';
}
export interface HeaderProps {
    variant: HeaderVariant;
    title: string;
    eyebrow?: string;
    lede?: string;
    /** hero: the primary + secondary pair. workbench: the same pair, right of the search. */
    primary?: HeaderAction;
    secondary?: HeaderAction;
    /** workbench: the search input, placed right of the title. */
    tools?: ReactNode;
    /**
     * workbench: small controls that size themselves (a view toggle, a ••• menu). They stay on the
     * title line on a phone too, where `tools` and the buttons drop under it.
     */
    actions?: ReactNode;
    /** workbench: the chip row under the title line. */
    filters?: ReactNode;
    /** hero: a brand mark drawn in place of the h1 (the title still names the page). */
    mark?: ReactNode;
    /** hero: an illustration above the eyebrow, with the h1 still drawn under it. */
    art?: ReactNode;
    /** Phone layout: tools stack under the title, the hero h1 drops to 28. */
    compact?: boolean;
}
export declare function Header(props: HeaderProps): import("react").JSX.Element;
