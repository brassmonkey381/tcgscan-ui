import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, View } from 'react-native';
import { Button, ChipGap, Frame, TypeScale, useKit } from '../kit';
/** The column width each header implies. The page never picks its own. */
export const HEADER_WIDTH = {
    doc: 'doc',
    hero: 'doc',
    workbench: 'wide',
};
export function Header(props) {
    if (props.variant === 'hero')
        return _jsx(HeroHeader, { ...props });
    if (props.variant === 'workbench')
        return _jsx(WorkbenchHeader, { ...props });
    return _jsx(DocHeader, { ...props });
}
function Title({ children, size, centred }) {
    const { colors, skin } = useKit();
    return (_jsx(Text, { accessibilityRole: "header", style: [
            { fontSize: size, lineHeight: Math.round(size * 1.15), fontWeight: '800', color: colors.text },
            centred && styles.titleCentred,
            skin.displayFace?.(800),
        ], ...skin.displayProps, children: children }));
}
function Eyebrow({ children, accent }) {
    const { colors } = useKit();
    return (_jsx(Text, { style: [styles.eyebrow, { color: accent ? colors.link : colors.textSecondary }], children: children }));
}
function Lede({ children, centred }) {
    const { colors } = useKit();
    return (_jsx(Text, { style: [styles.lede, { color: colors.textSecondary }, centred && styles.ledeCentred], children: children }));
}
function DocHeader({ title, eyebrow, lede }) {
    const { colors } = useKit();
    return (_jsxs(View, { style: [styles.doc, { borderBottomColor: colors.hairline }], children: [eyebrow ? _jsx(Eyebrow, { children: eyebrow }) : null, _jsx(Title, { size: TypeScale.h1, children: title }), lede ? _jsx(Lede, { children: lede }) : null] }));
}
function HeroHeader({ title, eyebrow, lede, primary, secondary, mark, art, compact }) {
    return (_jsxs(View, { style: styles.hero, children: [art ? _jsx(View, { style: styles.heroTitle, children: art }) : null, eyebrow ? _jsx(Eyebrow, { accent: true, children: eyebrow }) : null, _jsx(View, { style: styles.heroTitle, children: mark ?? (_jsx(Title, { size: compact ? TypeScale.h1 : TypeScale.hero, centred: true, children: title })) }), lede ? _jsx(Lede, { centred: true, children: lede }) : null, (primary || secondary) && (_jsxs(View, { style: styles.heroActions, children: [primary && _jsx(Button, { look: "primary", size: "lg", ...primary }), secondary && _jsx(Button, { look: "secondary", size: "lg", ...secondary })] }))] }));
}
function WorkbenchHeader({ title, lede, primary, secondary, tools, actions, filters, compact }) {
    const titleBlock = (_jsxs(View, { style: styles.workbenchTitle, children: [_jsx(Title, { size: TypeScale.h1, children: title }), lede ? _jsx(Lede, { children: lede }) : null] }));
    const inline = actions && compact;
    return (_jsxs(View, { style: styles.workbench, children: [_jsxs(View, { style: [styles.workbenchLine, compact && styles.workbenchLineCompact], children: [inline ? (_jsxs(View, { style: styles.workbenchTitle, children: [_jsxs(View, { style: styles.workbenchTitleLine, children: [_jsx(View, { style: styles.workbenchTitle, children: _jsx(Title, { size: TypeScale.h1, children: title }) }), actions] }), lede ? _jsx(Lede, { children: lede }) : null] })) : (titleBlock), (tools || primary || secondary || (actions && !compact)) && (_jsxs(View, { style: [styles.workbenchTools, compact && styles.workbenchToolsCompact], children: [tools ? _jsx(View, { style: compact ? styles.toolFill : styles.toolFixed, children: tools }) : null, secondary && _jsx(Button, { look: "secondary", ...secondary }), primary && _jsx(Button, { look: "primary", ...primary }), compact ? null : actions] }))] }), filters] }));
}
const styles = StyleSheet.create({
    eyebrow: {
        fontSize: Frame.railGroupLabel,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    lede: { fontSize: TypeScale.body, lineHeight: 24, maxWidth: 640 },
    ledeCentred: { textAlign: 'center', maxWidth: 520 },
    // A hero h1 that wraps stays centred line by line, not just as a block.
    titleCentred: { textAlign: 'center' },
    doc: { gap: 8, paddingBottom: 24, borderBottomWidth: StyleSheet.hairlineWidth },
    hero: { alignItems: 'center', gap: 12, paddingVertical: 16 },
    heroTitle: { alignItems: 'center' },
    heroActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 8 },
    workbench: { gap: 16 },
    workbenchLine: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 },
    workbenchLineCompact: { flexDirection: 'column', alignItems: 'stretch' },
    workbenchTitle: { flexShrink: 1, gap: 4 },
    workbenchTitleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    workbenchTools: { flexDirection: 'row', alignItems: 'center', gap: ChipGap },
    workbenchToolsCompact: { alignSelf: 'stretch' },
    toolFixed: { width: 320 },
    toolFill: { flex: 1 },
});
