import { type ControlSize } from './scale';
export interface SegOption<T extends string> {
    value: T;
    label: string;
}
/**
 * A segment group: a panel-grey track, padded 2, with the chosen option lifted onto the surface.
 * `md` (44 outside) in sheets and forms, `sm` (36) inside rows and inspector sections.
 */
export declare function Seg<T extends string>({ options, value, onChange, size, accessibilityLabel, }: {
    options: readonly SegOption<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: Exclude<ControlSize, 'lg'>;
    accessibilityLabel?: string;
}): import("react").JSX.Element;
