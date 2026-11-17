import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './button';
import { TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';
export function StatePanel({ title, body, art, glyph, primary, secondary, hint, compact, }) {
    const { colors, skin } = useKit();
    const buttons = primary || secondary ? (_jsxs(View, { style: [styles.buttons, compact && styles.buttonsCompact], children: [primary ? _jsx(Button, { look: "primary", size: compact ? 'sm' : 'md', label: primary.label, onPress: primary.onPress }) : null, secondary ? _jsx(Button, { size: compact ? 'sm' : 'md', label: secondary.label, onPress: secondary.onPress }) : null] })) : null;
    const hintNode = hint == null ? null : typeof hint === 'string' ? (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.hint, { color: colors.textSecondary }], children: hint })) : (hint);
    if (compact) {
        return (_jsxs(View, { role: "region", style: [styles.card, { backgroundColor: colors.backgroundElement, borderRadius: skin.radius.panel }], children: [glyph ? (_jsx(View, { style: [styles.glyphBox, { backgroundColor: colors.accentSoft, borderRadius: skin.radius.input }], "aria-hidden": true, children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: [styles.glyph, { color: colors.link }], children: glyph }) })) : null, _jsxs(View, { style: styles.cardText, children: [_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, role: "heading", style: [styles.cardTitle, { color: colors.text }], children: title }), body ? _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.cardBody, { color: colors.textSecondary }], children: body }) : null, buttons, hintNode] })] }));
    }
    return (_jsxs(View, { role: "region", style: styles.full, children: [art ? _jsx(View, { style: styles.art, children: art }) : null, _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, role: "heading", "aria-level": 1, style: [styles.title, { color: colors.text }], children: title }), body ? _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.body, { color: colors.textSecondary }], children: body }) : null, buttons, hintNode] }));
}
/**
 * The empty binder page: a 3x3 of dashed pockets on a card, with an optional round badge
 * (a lock for private, ? for not found) at its lower right.
 */
export function PocketsArt({ badge, size = 128 }) {
    const { colors, skin } = useKit();
    // Inner width less the two 6 gaps and each pocket's 1.5 border, so three always fit on a row.
    const pocket = Math.floor((size - 24 - 2 - 12) / 3) - 1;
    return (_jsxs(View, { "aria-hidden": true, style: { width: size + 16, height: size * 1.3 + 16 }, children: [_jsx(View, { style: [styles.page, { width: size, height: size * 1.3, backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.panel }], children: Array.from({ length: 9 }, (_, i) => (_jsx(View, { style: [styles.pocket, { width: pocket, height: Math.floor((size * 1.3 - 24 - 2 - 12) / 3) - 1, borderColor: colors.hairline, backgroundColor: colors.backgroundElement }] }, i))) }), badge ? (_jsx(View, { style: [styles.badge, { backgroundColor: colors.accent, borderColor: colors.background }], children: badge === 'lock' ? (_jsxs(View, { style: styles.lock, children: [_jsx(View, { style: [styles.shackle, { borderColor: colors.accentText }] }), _jsx(View, { style: [styles.lockBody, { backgroundColor: colors.accentText }] })] })) : typeof badge === 'string' ? (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: [styles.badgeGlyph, { color: colors.accentText }], children: badge })) : (badge) })) : null] }));
}
const styles = StyleSheet.create({
    full: { alignItems: 'center', gap: 12, paddingVertical: 48, paddingHorizontal: 16, maxWidth: 560, alignSelf: 'center', width: '100%' },
    art: { marginBottom: 12 },
    title: { fontSize: TypeScale.h1 * 0.8, lineHeight: 36, fontWeight: '800', textAlign: 'center' },
    body: { fontSize: TypeScale.body, lineHeight: 25, textAlign: 'center', maxWidth: 460 },
    buttons: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 12 },
    buttonsCompact: { justifyContent: 'flex-start', marginTop: 8, gap: 8 },
    hint: { fontSize: TypeScale.meta, lineHeight: 18, textAlign: 'center' },
    card: { flexDirection: 'row', gap: 12, padding: 14, flex: 1, minWidth: 260 },
    glyphBox: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    glyph: { fontSize: TypeScale.control, fontWeight: '700' },
    cardText: { flex: 1, gap: 2 },
    cardTitle: { fontSize: TypeScale.control, lineHeight: 20, fontWeight: '700' },
    cardBody: { fontSize: TypeScale.meta, lineHeight: 18 },
    page: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: 12, borderWidth: 1 },
    pocket: { borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 4 },
    badge: { position: 'absolute', right: 0, bottom: 0, width: 40, height: 40, borderRadius: 20, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
    badgeGlyph: { fontSize: TypeScale.control, fontWeight: '800' },
    lock: { alignItems: 'center' },
    shackle: { width: 10, height: 8, borderWidth: 2, borderBottomWidth: 0, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
    lockBody: { width: 14, height: 10, borderRadius: 2 },
});
