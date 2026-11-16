import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { animate, useReduceMotion } from './motion';
import { ControlPad, Height, ToastSize, TypeScale, FontScaleCap } from './scale';
import { KitChrome, useKit } from './skin';
/** Older tcgscan-theme builds have no chrome danger/warning; fall back to the page palette's. */
const CHROME = KitChrome;
function markFor(tone, page) {
    switch (tone) {
        case 'info':
            return { glyph: 'i', fill: KitChrome.textSecondary, ink: KitChrome.deep };
        case 'success':
            return { glyph: '✓', fill: KitChrome.success, ink: KitChrome.deep };
        case 'limit':
            return { glyph: '★', fill: KitChrome.accent, ink: KitChrome.accentText };
        case 'warning':
            return { glyph: '!', fill: CHROME.warning ?? page.warning, ink: KitChrome.deep };
        default:
            return { glyph: '!', fill: CHROME.danger ?? page.danger, ink: KitChrome.deep };
    }
}
/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones), or
 * use `ToastProvider` + `useToast()` and it sits there for you.
 *
 * Without a `tone` it is the original toast: it arrives with a small pop (fade in, rising from 92%
 * to full size). With a tone (v0.14) it also rises 12 from below, shows the tone's mark, an
 * optional picture (`thumb`), an X when `onClose` is set, and a bar that runs down over
 * `duration` ms so the reader sees how long it stays.
 */
export function Toast({ message, action, actions, tone, lead, thumb, onClose, duration, progress, }) {
    const { skin, colors } = useKit();
    const reduce = useReduceMotion();
    const [t] = useState(() => new Animated.Value(0));
    const [timer] = useState(() => new Animated.Value(1));
    useEffect(() => {
        // Arrives on the motion ladder's arrive step, easing out (owner's pick: no overshoot).
        animate(t, 1, 'arrive', { reduce, fade: true, nativeDriver: true }).start();
    }, [t, reduce]);
    useEffect(() => {
        if (!duration)
            return;
        timer.setValue(1);
        const run = Animated.timing(timer, { toValue: 0, duration, easing: Easing.linear, useNativeDriver: false });
        run.start();
        return () => run.stop();
    }, [timer, duration, message]);
    const mark = tone ? markFor(tone, colors) : null;
    const rise = tone && !reduce ? [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] : [];
    return (_jsxs(Animated.View, { role: "alert", "aria-live": tone === 'error' ? 'assertive' : 'polite', style: [
            styles.toast,
            { borderRadius: skin.radius.toast },
            tone === 'limit' && { borderLeftWidth: 4, borderLeftColor: KitChrome.accent },
            mark && styles.toned,
            { opacity: t.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] }), transform: [...rise, { scale: t.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] },
        ], children: [lead ? _jsx(View, { style: styles.thumb, children: lead }) : mark && (_jsx(View, { style: [styles.mark, { backgroundColor: mark.fill }], "aria-hidden": true, children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: [styles.markGlyph, { color: mark.ink }], children: mark.glyph }) })), thumb ? _jsx(View, { style: styles.thumb, children: thumb }) : null, _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, numberOfLines: 1, style: styles.message, children: message }), (actions ?? (action ? [action] : [])).slice(0, 2).map((a, i, all) => {
                const accent = tone === 'limit' && i === all.length - 1;
                return (_jsx(Pressable, { role: "button", onPress: a.onPress, style: [styles.action, accent && { backgroundColor: KitChrome.accent }, { borderRadius: skin.radius.button }], children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: [styles.actionLabel, accent && { color: KitChrome.accentText }], children: a.label }) }, a.label));
            }), onClose && (_jsx(Pressable, { role: "button", accessibilityLabel: "Dismiss", hitSlop: 6, onPress: onClose, style: styles.close, children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, style: styles.closeGlyph, children: "\u00D7" }) })), progress != null ? (_jsx(View, { "aria-hidden": true, style: [styles.timer, { backgroundColor: mark ? mark.fill : KitChrome.link, width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` }] })) : duration ? (_jsx(Animated.View, { "aria-hidden": true, style: [
                    styles.timer,
                    { backgroundColor: mark ? mark.fill : KitChrome.textSecondary, width: timer.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
                ] })) : null] }));
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
        shadowColor: KitChrome.deepest,
        shadowOpacity: 0.2,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        overflow: 'hidden',
    },
    toned: { paddingLeft: 12 },
    mark: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    markGlyph: { fontSize: TypeScale.meta, lineHeight: 16, fontWeight: '800' },
    thumb: { flexShrink: 0 },
    message: { flex: 1, color: KitChrome.text, fontSize: TypeScale.control },
    action: {
        height: Height.sm,
        paddingHorizontal: ControlPad.sm,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.14)',
    },
    actionLabel: { color: KitChrome.text, fontSize: TypeScale.meta, fontWeight: '600' },
    close: { width: 32, height: Height.sm, alignItems: 'center', justifyContent: 'center' },
    closeGlyph: { color: KitChrome.textSecondary, fontSize: TypeScale.body, lineHeight: TypeScale.body + 2 },
    timer: { position: 'absolute', left: 0, bottom: 0, height: 3, opacity: 0.8 },
});
