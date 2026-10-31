/**
 * A dropdown's closed face: the chosen value in a field and a chevron box on its right edge, so it
 * reads as "choose from a list" rather than as a button or as text (owner's pick, 2026-10-31: a white
 * field with a navy chevron box). It opens nothing itself; the host opens its list on press.
 */
export declare function SelectTrigger({ value, onPress, accessibilityLabel, size, disabled, }: {
    value: string;
    onPress: () => void;
    accessibilityLabel?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
}): import("react").JSX.Element;
