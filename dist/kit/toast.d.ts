/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones).
 */
export declare function Toast({ message, action, }: {
    message: string;
    action?: {
        label: string;
        onPress: () => void;
    };
}): import("react").JSX.Element;
