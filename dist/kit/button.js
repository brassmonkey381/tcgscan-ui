import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { LipPressable, LoadingDots } from './lip';
import { animate, useReduceMotion } from './motion';
import { ControlPad, ControlText, Height, FontScaleCap } from './scale';
import { useKit } from './skin';
export function Button({ label, onPress, look = 'secondary', size = 'md', tone, disabled, loading, fill, accessibilityLabel, style, }) {
    const kit = useKit();
    const paint = lookColors(kit, look, tone);
    const lip = kit.skin.lip;
    const lipped = !!lip && look !== 'quiet';
    const underline = look === 'quiet' && kit.skin.ink?.linkUnderline;
    // The label and the loading pixels cross-fade (state step of the motion ladder).
    const reduce = useReduceMotion();
    const [fade] = useState(() => new Animated.Value(1));
    useEffect(() => {
        fade.setValue(0);
        animate(fade, 1, 'state', { reduce, fade: true, nativeDriver: true }).start();
    }, [loading, fade, reduce]);
    const body = (_jsx(Animated.View, { style: [styles.inner, { opacity: fade }], children: loading ? (_jsx(LoadingDots, { color: paint.text })) : (_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, selectable: false, numberOfLines: 1, style: [styles.label, { fontSize: ControlText[size], color: paint.text }, underline && styles.underline], children: label })) }));
    const surface = [
        styles.base,
        {
            paddingHorizontal: look === 'quiet' ? ControlPad.sm : ControlPad[size],
            backgroundColor: paint.fill,
            borderColor: paint.border,
            borderWidth: paint.border ? 1.5 : 0,
        },
        // A lipped skin's lip IS the primary's edge; the old drop shadow is for flat skins only.
        !lipped && look === 'primary' && !tone && kit.skin.primaryShadow,
    ];
    return (_jsx(LipPressable, { accessibility: {
            role: 'button',
            accessibilityLabel: accessibilityLabel ?? label,
            'aria-disabled': !!disabled || !!loading,
            'aria-selected': look === 'selected',
            'aria-busy': !!loading,
        }, height: Height[size], radius: kit.skin.radius.button, lipColor: lipped ? (look === 'primary' && !tone ? lip.primary : lip.secondary) : 'transparent', disabled: disabled, onPress: loading ? undefined : onPress, surface: surface, fill: fill, style: style, children: body }));
}
function lookColors({ colors, skin }, look, tone) {
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
            // On a lipped skin the second button has a warm edge, so it still reads on cards of the same
            // pale yellow (owner's pick: 'pale yellow, warm border, WITH a lip').
            return { fill: colors.backgroundElement, text: colors.text, border: skin.lip ? colors.controlBorder : undefined };
    }
}
const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    // No flex: 1. A stretching label box in a row that gives the button no width collapses to
    // nothing on native (the label vanished in a header on iOS, 2026-10-31); it sizes to its label.
    inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    label: { fontWeight: '600' },
    underline: { textDecorationLine: 'underline' },
});
