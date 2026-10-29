import { type ReactNode } from 'react';
import { type FrameWidth } from '../kit';
import { type HeaderProps } from './header';
import { type RailGroup } from './rail';
export interface ShellNav {
    brand?: ReactNode;
    groups: readonly RailGroup[];
}
/**
 * The page frame, one per route:
 *
 *   [rail 216] [ content column: back row · header · page · footer ]   (desktop, >= 900)
 *   [ menu row · header · page · footer ] [tab bar slot]               (phone, gutter 16)
 *
 * The header variant picks the column width (doc/hero 960, workbench 1440); `width` overrides it
 * only for prose (800). The rail is optional: without `nav` the shell is just the column, which is
 * how it ships first, under today's tab bar. `tabBar` is a slot so the tab bar can move into the
 * shell later without changing any route.
 */
export declare function Shell({ header, nav, width, back, action, footer, tabBar, scroll, children, }: {
    header?: Omit<HeaderProps, 'compact'>;
    nav?: ShellNav;
    width?: FrameWidth;
    back?: {
        label: string;
        onPress: () => void;
    };
    /** One control at the right end of the top row (an account button). */
    action?: ReactNode;
    footer?: ReactNode;
    tabBar?: ReactNode;
    /** Off for a route that owns its own scroller (a virtualized grid). */
    scroll?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
