import type { ReactNode } from 'react';
import { type FrameWidth } from '../kit';
/**
 * ONE HEADER LINE, THE SAME HEIGHT ON EVERY PAGE (owner, 2026-11-03: "all header sections the same
 * height", "fit a bit snugger"). Whatever the variant, the band holds one row: the way back, the
 * title (or a brand mark), and the page's own controls at the right, which shrink before the row
 * ever wraps. Anything that is not the title line (a lede, filter chips, a hero illustration) is
 * drawn by the Shell under the band, as the top of the page.
 *
 *   doc        the title alone (How-to, Settings, legal).
 *   hero       a brand mark in place of the title (Home).
 *   workbench  the title with tools, buttons and actions at the right (Browse, lists).
 *
 * `eyebrow` is accepted and no longer drawn: the rail and the tab bar already say where a page is.
 */
export type HeaderVariant = 'doc' | 'hero' | 'workbench';
/** The column width each header implies. The page never picks its own. */
export declare const HEADER_WIDTH: Record<HeaderVariant, FrameWidth>;
/** The one header line height: a 44 control, or a 30pt title, with room to breathe. */
export declare const HEADER_LINE = 48;
export interface HeaderAction {
    label: string;
    onPress: () => void;
    /** A destructive page action (delete this collection): the danger tone, never the primary look. */
    tone?: 'danger';
}
export interface HeaderProps {
    variant: HeaderVariant;
    title: string;
    /** Not drawn any more (see above); kept so existing callers still compile. */
    eyebrow?: string;
    /** Drawn by the Shell under the band, as the page's first line. */
    lede?: string;
    /** The page's buttons, at the right of the title line. */
    primary?: HeaderAction;
    secondary?: HeaderAction;
    /** Controls at the right of the title line (a search, a switch, a picker). They shrink first. */
    tools?: ReactNode;
    /** Small controls that size themselves (a view toggle, a ••• menu), last on the line. */
    actions?: ReactNode;
    /** Drawn by the Shell under the band (a chip row). */
    filters?: ReactNode;
    /** hero: a brand mark drawn in place of the title (the title still names the page). */
    mark?: ReactNode;
    /** Drawn by the Shell under the band, above the lede. */
    art?: ReactNode;
    /** Phone layout: a smaller title and small buttons. */
    compact?: boolean;
    /** Set by the Shell: the way back (or the menu) before the title, and its own control after. */
    lead?: ReactNode;
    trail?: ReactNode;
}
export declare function Header({ variant, title, primary, secondary, tools, actions, mark, compact, lead, trail }: HeaderProps): import("react").JSX.Element;
/** What the Shell draws under the band for a header: art, lede, filters. Null when there is none. */
export declare function HeaderBelow({ art, lede, filters }: Pick<HeaderProps, 'art' | 'lede' | 'filters'>): import("react").JSX.Element | null;
