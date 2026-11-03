import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * A failure line: caption 13/18, weight 600, the danger colour, no box or icon. It sits directly
 * under the control that failed, inside the same group, and is announced to screen readers.
 */
export declare function ErrorText({ children, style }: {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}): import("react").JSX.Element;
export type NoteTone = 'muted' | 'warning' | 'danger';
/**
 * A note: a hint, fine print, a result line, a caveat, a status. Caption 13/18. `working` adds the
 * stepping pixels before it (a line that says something is still going on).
 */
export declare function Note({ children, tone, align, working, style, }: {
    children: ReactNode;
    tone?: NoteTone;
    align?: 'left' | 'center' | 'right';
    working?: boolean;
    style?: StyleProp<ViewStyle>;
}): import("react").JSX.Element;
/**
 * A banner: a soft card (the Cards pick: no edge, the panel radius, padding 12) with a message,
 * an optional title and an optional small primary at its right end, which wraps under the text on
 * narrow windows. It stays where it is until its condition clears; it has no close button.
 */
export declare function Banner({ message, title, action, style, }: {
    message: ReactNode;
    title?: string;
    action?: {
        label: string;
        onPress: () => void;
        loading?: boolean;
    };
    style?: StyleProp<ViewStyle>;
}): import("react").JSX.Element;
/**
 * The wait rule: for the first 400 ms nothing new is drawn (most local reads finish inside it, so
 * the loader never flashes), then the kit Loading, centred in the slot; at 8 s a line under it says
 * the wait is long. The slot keeps `minHeight` the whole time, so nothing jumps.
 */
export declare function Wait({ label, minHeight, style }: {
    label?: string;
    minHeight?: number;
    style?: StyleProp<ViewStyle>;
}): import("react").JSX.Element;
