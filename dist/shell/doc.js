import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, View } from 'react-native';
import { TypeScale, useKit } from '../kit';
/** Reading measure inside the 960 doc column, so a guide reads like a page. */
export const DOC_MEASURE = 680;
/** A section of a doc page: a 17 heading and its paragraphs, 8 apart. */
export function DocSection({ heading, children }) {
    const { colors } = useKit();
    return (_jsxs(View, { style: styles.section, children: [heading ? (_jsx(Text, { accessibilityRole: "header", style: [styles.heading, { color: colors.text }], children: heading })) : null, children] }));
}
/** Body copy at 16 on 24, in the secondary ink, held to the reading measure. */
export function DocText({ children, tone = 'secondary' }) {
    const { colors } = useKit();
    return (_jsx(Text, { style: [
            tone === 'meta' ? styles.meta : styles.text,
            { color: tone === 'primary' ? colors.text : colors.textSecondary },
        ], children: children }));
}
const styles = StyleSheet.create({
    section: { gap: 8, maxWidth: DOC_MEASURE },
    heading: { fontSize: TypeScale.sheetTitle, lineHeight: 22, fontWeight: '700' },
    text: { fontSize: TypeScale.body, lineHeight: 24 },
    meta: { fontSize: TypeScale.meta, lineHeight: 18 },
});
