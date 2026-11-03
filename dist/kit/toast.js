import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { animate, useReduceMotion } from './motion';
import { ControlPad, Height, ToastSize, TypeScale, FontScaleCap } from './scale';
import { KitChrome, useKit } from './skin';
/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones).
 * It arrives with a small pop (fade in, rising from 92% to full size) so the eye catches it.
 */
export function Toast({ message, action, }) {
    const { skin } = useKit();
    const reduce = useReduceMotion();
    const [t] = useState(() => new Animated.Value(0));
    useEffect(() => {
        // Arrives on the motion ladder's arrive step, easing out (owner's pick: no overshoot).
        animate(t, 1, 'arrive', { reduce, fade: true, nativeDriver: true }).start();
    }, [t, reduce]);
    return (_jsxs(Animated.View, { accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [
            styles.toast,
            { borderRadius: skin.radius.toast },
            { opacity: t.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] }), transform: [{ scale: t.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] },
        ], children: [_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, numberOfLines: 1, style: styles.message, children: message }), action && (_jsx(Pressable, { accessibilityRole: "button", onPress: action.onPress, style: [styles.action, { borderRadius: skin.radius.button }], children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: styles.actionLabel, children: action.label }) }))] }));
}
const styles = StyleSheet.create({
    toast: {
        height: ToastSize.height,
        paddingLeft: ToastSize.sidePad,
        paddingRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: KitChrome.toast,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: KitChrome.toastBorder,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    message: { flex: 1, color: KitChrome.text, fontSize: TypeScale.control },
    action: {
        height: Height.sm,
        paddingHorizontal: ControlPad.sm,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.14)',
    },
    actionLabel: { color: KitChrome.text, fontSize: TypeScale.meta, fontWeight: '600' },
});
