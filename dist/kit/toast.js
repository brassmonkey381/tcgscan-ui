import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ControlPad, Height, ToastSize, TypeScale } from './scale';
import { KitChrome, useKit } from './skin';
/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones).
 */
export function Toast({ message, action, }) {
    const { skin } = useKit();
    return (_jsxs(View, { accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [styles.toast, { borderRadius: skin.radius.toast }], children: [_jsx(Text, { numberOfLines: 1, style: styles.message, children: message }), action && (_jsx(Pressable, { accessibilityRole: "button", onPress: action.onPress, style: [styles.action, { borderRadius: skin.radius.button }], children: _jsx(Text, { style: styles.actionLabel, children: action.label }) }))] }));
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
