import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * A pressable on the skin's hardware lip. Without a lip in the skin it is a plain Pressable that
 * dims when pressed, exactly the kit's old behaviour.
 *
 * With one: the control stands `depth` points above a solid edge of the lip colour and sinks onto
 * it while pressed, so a press reads as a key going down. A disabled control loses its lip and sits
 * flat and dimmed, because a key you cannot press should not look pressable.
 */
export declare function LipPressable({ height, radius, lipColor, disabled, onPress, surface, fill, style, children, accessibility, }: {
    height: number;
    radius: number;
    lipColor: string;
    disabled?: boolean;
    onPress?: () => void;
    /** The control's face: fill, border, padding. */
    surface: StyleProp<ViewStyle>;
    fill?: boolean;
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
    accessibility: object;
}): import("react").JSX.Element;
/** Three pixels stepping left to right: a button's loading state, in place of its label. */
export declare function LoadingDots({ color, size }: {
    color: string;
    size?: number;
}): import("react").JSX.Element;
