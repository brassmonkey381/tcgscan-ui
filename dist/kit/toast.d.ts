/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones).
 * It arrives with a small pop (fade in, rising from 92% to full size) so the eye catches it.
 */
export declare function Toast({ message, action, }: {
    message: string;
    action?: {
        label: string;
        onPress: () => void;
    };
}): import("react").JSX.Element;
