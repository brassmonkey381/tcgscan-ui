import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Height, TypeScale } from './scale';
import { useKit } from './skin';
/**
 * A text input, always 44 tall so it sits on one baseline with the medium button beside it.
 * `shape: 'search'` is the pill used in workbench headers; `field` takes the input radius.
 */
export function Input({ label, shape = 'field', style, ...rest }) {
    const { colors, skin } = useKit();
    const input = (_jsx(TextInput, { placeholderTextColor: colors.textSecondary, accessibilityLabel: rest.accessibilityLabel ?? label ?? rest.placeholder, ...rest, style: [
            styles.input,
            {
                borderRadius: shape === 'search' ? skin.radius.chip : skin.radius.input,
                paddingHorizontal: shape === 'search' ? 14 : 12,
                borderColor: colors.hairlineStrong,
                backgroundColor: colors.background,
                color: colors.text,
            },
            style,
        ] }));
    if (!label)
        return input;
    return (_jsxs(View, { style: styles.labelled, children: [_jsx(Text, { style: [styles.label, { color: colors.text }], children: label }), input] }));
}
const styles = StyleSheet.create({
    input: {
        height: Height.md,
        borderWidth: 1,
        fontSize: TypeScale.control,
        minWidth: 0,
    },
    labelled: { gap: 6 },
    label: { fontSize: TypeScale.meta, fontWeight: '600' },
});
