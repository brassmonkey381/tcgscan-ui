import { type ControlSize } from './scale';
export interface SegOption<T extends string> {
    value: T;
    label: string;
}
/**
 * A segment group: a panel-grey track, padded 2, with the chosen option lifted onto the surface.
 * `md` (44 outside) in sheets and forms, `sm` (36) inside rows and inspector sections.
 *
 * The chosen key slides to a new option over the motion ladder's state step (instant under Reduce
 * Motion). `fill` stretches the group across its line with equal segments, for a toggle that is
 * the only control on that line.
 */
export declare function Seg<T extends string>({ options, value, onChange, size, fill, accessibilityLabel, }: {
    options: readonly SegOption<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: Exclude<ControlSize, 'lg'>;
    fill?: boolean;
    accessibilityLabel?: string;
}): import("react").JSX.Element;
