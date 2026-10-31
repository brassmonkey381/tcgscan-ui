import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Palette } from 'tcgscan-theme';
import { type KitValue } from './skin';
/** A soft halo for a title that glows on a dark pop-up. */
export declare const GLOW: {
    readonly textShadowColor: "rgba(63,216,255,0.8)";
    readonly textShadowRadius: 10;
    readonly textShadowOffset: {
        readonly width: 0;
        readonly height: 0;
    };
};
/** The palette a pop-up draws with: the skin's popup colours over the page's, or the page's. */
export declare function popupColors({ colors, skin }: KitValue): Palette;
/**
 * A pop-up's panel, for a host that builds its own modal: the skin's popup surface (fill, the edge
 * band along the top) with every kit control inside drawing in the popup palette. Sheet and Dialog
 * use the same colours, so a hand-built pop-up and a kit one look alike.
 */
export declare function PopupSurface({ children, style, edge, }: {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    /** Draw the skin's top edge band (off for a pop-up whose top is not its own edge). */
    edge?: boolean;
}): import("react").JSX.Element;
