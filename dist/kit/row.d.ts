import { type ReactNode } from 'react';
/**
 * A settings / inspector row: 48 tall, control at the right edge.
 *
 * Two shapes from one component:
 *   list       leading glyph · label (fills) · value · control       (`labelColumn` off)
 *   inspector  label in a fixed 96 column · control fills after it   (`labelColumn` on)
 */
export declare function Row({ label, value, leading, children, labelColumn, onPress, caption, wrap, }: {
    label: string;
    /** A line under the label that explains the setting (the row grows to fit). */
    caption?: string;
    /** Let a long label wrap instead of cutting it to one line. */
    wrap?: boolean;
    value?: string;
    leading?: ReactNode;
    /** The control. */
    children?: ReactNode;
    labelColumn?: boolean;
    onPress?: () => void;
}): import("react").JSX.Element;
/** Rows on one panel with a hairline between each. */
export declare function RowGroup({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
