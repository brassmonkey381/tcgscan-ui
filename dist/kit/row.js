import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RowSize, TypeScale } from './scale';
import { useKit } from './skin';
/**
 * A settings / inspector row: 48 tall, control at the right edge.
 *
 * Two shapes from one component:
 *   list       leading glyph · label (fills) · value · control       (`labelColumn` off)
 *   inspector  label in a fixed 96 column · control fills after it   (`labelColumn` on)
 */
export function Row({ label, value, leading, children, labelColumn, onPress, }) {
    const { colors } = useKit();
    const body = (_jsxs(_Fragment, { children: [leading, _jsx(Text, { numberOfLines: 1, style: [
                    labelColumn ? styles.labelColumn : styles.label,
                    { color: labelColumn ? colors.textSecondary : colors.text },
                ], children: label }), value != null && (_jsx(Text, { numberOfLines: 1, style: [styles.value, { color: colors.textSecondary }], children: value })), children != null && _jsx(View, { style: labelColumn ? styles.controlFill : undefined, children: children })] }));
    if (onPress) {
        return (_jsx(Pressable, { accessibilityRole: "button", onPress: onPress, style: ({ pressed }) => [styles.row, pressed && { backgroundColor: colors.backgroundElement }], children: body }));
    }
    return _jsx(View, { style: styles.row, children: body });
}
/** Rows on one panel with a hairline between each. */
export function RowGroup({ children }) {
    const { colors, skin } = useKit();
    const items = Children.toArray(children);
    return (_jsx(View, { style: [
            styles.group,
            { borderRadius: skin.radius.panel, borderColor: colors.hairline, backgroundColor: colors.background },
        ], children: items.map((child, i) => (_jsxs(Fragment, { children: [i > 0 && _jsx(View, { style: [styles.hairline, { backgroundColor: colors.hairline }] }), child] }, i))) }));
}
const styles = StyleSheet.create({
    row: {
        height: RowSize.height,
        paddingHorizontal: RowSize.sidePad,
        flexDirection: 'row',
        alignItems: 'center',
        gap: RowSize.gap,
    },
    label: { flex: 1, fontSize: TypeScale.control },
    labelColumn: { width: RowSize.labelWidth, flexShrink: 0, fontSize: TypeScale.meta },
    value: { fontSize: TypeScale.meta },
    controlFill: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
    group: { borderWidth: 1, overflow: 'hidden' },
    hairline: { height: StyleSheet.hairlineWidth },
});
