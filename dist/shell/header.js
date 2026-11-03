import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, Text, View } from 'react-native';
import { Button, Frame, TypeScale, useKit } from '../kit';
import { FontScaleCap } from '../kit/scale';
/** The column width each header implies. The page never picks its own. */
export const HEADER_WIDTH = {
    doc: 'doc',
    hero: 'doc',
    workbench: 'wide',
};
/** The one header line height: a 44 control, or a 30pt title, with room to breathe. */
export const HEADER_LINE = 48;
export function Header({ variant, title, primary, secondary, tools, actions, mark, compact, lead, trail }) {
    const { colors, skin } = useKit();
    const ink = skin.ink;
    const px = compact ? TITLE.compact : TITLE.wide;
    const size = compact ? 'sm' : 'md';
    return (_jsxs(View, { style: styles.line, children: [lead, _jsx(View, { style: styles.title, children: variant === 'hero' && mark ? (mark) : (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, role: "heading", numberOfLines: 1, style: [
                        { fontSize: px, lineHeight: Math.round(px * 1.15), fontWeight: '800', color: ink?.title ?? colors.text },
                        // The title's lip: a hard shadow straight down, the buttons' hardware edge in type.
                        ink?.titleLip ? { textShadowColor: ink.titleLip, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0 } : null,
                        skin.displayFace?.(800),
                    ], ...skin.displayProps, children: title })) }), tools || primary || secondary || actions || trail ? (_jsxs(View, { style: styles.right, children: [tools ? _jsx(View, { style: styles.tools, children: tools }) : null, secondary ? _jsx(Button, { look: "secondary", size: size, ...secondary }) : null, primary ? _jsx(Button, { look: "primary", size: size, ...primary }) : null, actions, trail] })) : null] }));
}
/** The title on one line: smaller on a phone, so the controls beside it keep their room. */
const TITLE = { compact: 24, wide: 30 };
/** What the Shell draws under the band for a header: art, lede, filters. Null when there is none. */
export function HeaderBelow({ art, lede, filters }) {
    const { colors } = useKit();
    if (!art && !lede && !filters)
        return null;
    return (_jsxs(View, { style: styles.below, children: [art ? _jsx(View, { style: styles.art, children: art }) : null, lede ? (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.lede, { color: colors.textSecondary }], children: lede })) : null, filters] }));
}
const styles = StyleSheet.create({
    line: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: HEADER_LINE },
    title: { flexShrink: 1, flexGrow: 1, minWidth: 0, justifyContent: 'center' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1, minWidth: 0 },
    tools: { flexShrink: 1, minWidth: 0 },
    below: { gap: 8 },
    art: { alignItems: 'center' },
    lede: { fontSize: TypeScale.body, lineHeight: 24, maxWidth: Frame.width.prose },
});
