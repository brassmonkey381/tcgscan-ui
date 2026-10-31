/**
 * A checkbox: a 22 square in a 44 target. Checked is the skin's check fill with its tick (BiBo: a
 * navy square, a glowing cyan tick); unchecked is the empty square. With `label` the whole row is
 * the target.
 */
export declare function Check({ checked, onPress, label, accessibilityLabel, disabled, }: {
    checked: boolean;
    onPress?: () => void;
    label?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
}): import("react").JSX.Element;
