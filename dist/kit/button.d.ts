import { type StyleProp, type ViewStyle } from 'react-native';
import { type ControlSize } from './scale';
/**
 * The four looks, and only four. One primary per view.
 *
 *   primary    accent fill, accentText label. The one action the view is for.
 *   secondary  panel grey. Everything else that is a button.
 *   selected   link ring on the surface, link label. The chosen option of a set.
 *   quiet      text only, for Cancel and links inside a row.
 *
 * `tone: 'danger'` is Secondary in the danger tint, never red text alone.
 */
export type ButtonLook = 'primary' | 'secondary' | 'selected' | 'quiet';
export interface ButtonProps {
    label: string;
    onPress?: () => void;
    look?: ButtonLook;
    size?: ControlSize;
    tone?: 'danger';
    disabled?: boolean;
    /** Stretch to share a row equally (sheet and dialog button rows). */
    fill?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
export declare function Button({ label, onPress, look, size, tone, disabled, fill, accessibilityLabel, style, }: ButtonProps): import("react").JSX.Element;
