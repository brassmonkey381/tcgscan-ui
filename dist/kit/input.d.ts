import { type TextInputProps } from 'react-native';
/**
 * A text input, always 44 tall so it sits on one baseline with the medium button beside it.
 * `shape: 'search'` is the pill used in workbench headers; `field` takes the input radius.
 */
export declare function Input({ label, shape, style, ...rest }: TextInputProps & {
    label?: string;
    shape?: 'field' | 'search';
}): import("react").JSX.Element;
