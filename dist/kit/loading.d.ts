/**
 * The one loading indicator: three pixels stepping left to right in the skin's loading colour
 * (BiBo: deep cyan), with an optional line of text beside them. Replaces spinners.
 */
export declare function Loading({ label, size }: {
    label?: string;
    size?: number;
}): import("react").JSX.Element;
