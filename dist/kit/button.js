import { jsx as _jsx } from "react/jsx-runtime";
import { Pressable, StyleSheet, Text } from 'react-native';
import { ControlPad, ControlText, Height } from './scale';
import { useKit } from './skin';
export function Button({ label, onPress, look = 'secondary', size = 'md', tone, disabled, fill, accessibilityLabel, style, }) {
    const kit = useKit();
    const paint = lookColors(kit, look, tone);
    return (_jsx(Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel ?? label, accessibilityState: { disabled: !!disabled, selected: look === 'selected' }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [
            styles.base,
            {
                height: Height[size],
                paddingHorizontal: look === 'quiet' ? ControlPad.sm : ControlPad[size],
                borderRadius: kit.skin.radius.button,
                backgroundColor: paint.fill,
                borderColor: paint.border,
                borderWidth: paint.border ? 1.5 : 0,
                opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
            },
            look === 'primary' && !tone && kit.skin.primaryShadow,
            fill && styles.fill,
            style,
        ], children: _jsx(Text, { numberOfLines: 1, style: [styles.label, { fontSize: ControlText[size], color: paint.text }], children: label }) }));
}
function lookColors({ colors }, look, tone) {
    if (tone === 'danger') {
        return { fill: colors.dangerBg, text: colors.danger, border: undefined };
    }
    switch (look) {
        case 'primary':
            return { fill: colors.accent, text: colors.accentText, border: undefined };
        case 'selected':
            // `link`, not `accent`: the accent is a fill colour, and a yellow ring vanishes on paper.
            return { fill: colors.background, text: colors.link, border: colors.link };
        case 'quiet':
            return { fill: 'transparent', text: colors.link, border: undefined };
        default:
            return { fill: colors.backgroundElement, text: colors.text, border: undefined };
    }
}
const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    fill: { flex: 1, flexShrink: 1, minWidth: 0 },
    label: { fontWeight: '600' },
});
