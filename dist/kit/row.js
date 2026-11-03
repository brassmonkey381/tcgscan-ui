import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Children, Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RowSize, TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';
/**
 * A settings / inspector row: 48 tall, control at the right edge.
 *
 * Two shapes from one component:
 *   list       leading glyph · label (fills) · value · control       (`labelColumn` off)
 *   inspector  label in a fixed 96 column · control fills after it   (`labelColumn` on)
 */
export function Row({ label, value, leading, children, labelColumn, onPress, caption, wrap, }) {
    const { colors } = useKit();
    const body = (_jsxs(_Fragment, { children: [leading, _jsxs(View, { style: labelColumn ? styles.labelColumnBox : styles.labelBox, children: [_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, numberOfLines: wrap || caption ? undefined : 1, style: [labelColumn ? styles.labelColumn : styles.labelText, { color: labelColumn ? colors.textSecondary : colors.text }], children: label }), caption ? _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: [styles.caption, { color: colors.textSecondary }], children: caption }) : null] }), value != null && (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, numberOfLines: 1, style: [styles.value, { color: colors.textSecondary }], children: value })), children != null && _jsx(View, { style: labelColumn ? styles.controlFill : undefined, children: children })] }));
    if (onPress) {
        return (_jsx(Pressable, { accessibilityRole: "button", onPress: onPress, style: ({ pressed }) => [styles.row, (wrap || caption) && styles.tall, pressed && { backgroundColor: colors.backgroundElement }], children: body }));
    }
    return _jsx(View, { style: [styles.row, (wrap || caption) && styles.tall], children: body });
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
    // A row with a caption or a wrapping label grows from 48 instead of cutting its text.
    tall: { height: undefined, minHeight: RowSize.height, paddingVertical: 10 },
    labelBox: { flex: 1, minWidth: 0, gap: 2 },
    labelColumnBox: { width: RowSize.labelWidth, flexShrink: 0, gap: 2 },
    labelText: { fontSize: TypeScale.control },
    labelColumn: { fontSize: TypeScale.meta },
    caption: { fontSize: TypeScale.meta },
    value: { fontSize: TypeScale.meta },
    controlFill: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
    group: { borderWidth: 1, overflow: 'hidden' },
    hairline: { height: StyleSheet.hairlineWidth },
});
