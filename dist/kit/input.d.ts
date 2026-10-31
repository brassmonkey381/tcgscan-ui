import { type TextInputProps } from 'react-native';
/**
 * A text input, always 44 tall so it sits on one baseline with the medium button beside it.
 * `shape: 'search'` is the pill used in workbench headers; `field` takes the input radius.
 *
 * A skin with `input` (BiBo) draws it as a screen: its fill, its text colour and face, and with
 * `marquee` a placeholder that scrolls sideways like a ticker while the field is empty and idle.
 */
export declare function Input({ label, shape, style, ...rest }: TextInputProps & {
    label?: string;
    shape?: 'field' | 'search';
}): import("react").JSX.Element;
