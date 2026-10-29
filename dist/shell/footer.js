import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TypeScale, useKit } from '../kit';
/** The footer slot at the bottom of the content column: the same links on every page. */
export function Footer({ links, note }) {
    const { colors } = useKit();
    return (_jsxs(View, { style: [styles.footer, { borderTopColor: colors.hairline }], children: [_jsx(View, { style: styles.links, children: links.map((l) => (_jsx(Pressable, { accessibilityRole: "link", onPress: l.onPress, hitSlop: 8, children: _jsx(Text, { style: [styles.link, { color: colors.textSecondary }], children: l.label }) }, l.label))) }), note ? _jsx(Text, { style: [styles.link, { color: colors.textSecondary }], children: note }) : null] }));
}
const styles = StyleSheet.create({
    footer: {
        marginTop: 48,
        paddingTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    // Shrinkable, or the row sizes to one line of links and its own wrap never gets a width to
    // wrap at: on a phone the last link ran off the edge.
    links: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, flexShrink: 1, minWidth: 0 },
    link: { fontSize: TypeScale.meta },
});
