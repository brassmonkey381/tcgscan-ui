import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Breakpoints } from 'tcgscan-theme';
import { Button } from './button';
import { Height, SheetSize, TypeScale } from './scale';
import { useKit } from './skin';
import { useWindowSize } from './window-size';
/**
 * A sheet: title row 56, body, button row 72. Buttons live in the bottom row and nowhere else,
 * equal width, 12 apart, safe choice first and the primary last.
 *
 * Bottom-anchored on a phone; a centred panel once the window has room for the rail.
 */
export function Sheet({ visible, title, onClose, actions, children, }) {
    const { colors, skin } = useKit();
    const { width } = useWindowSize();
    const insets = useSafeAreaInsets();
    const wide = width >= Breakpoints.rail;
    const radius = skin.radius.sheet;
    return (_jsx(Modal, { visible: visible, transparent: true, animationType: wide ? 'fade' : 'slide', onRequestClose: onClose, children: _jsxs(View, { style: [styles.backdrop, wide ? styles.centre : styles.bottom], children: [_jsx(Pressable, { accessibilityLabel: "Close", style: [StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }], onPress: onClose }), _jsxs(View, { accessibilityViewIsModal: true, style: [
                        styles.panel,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.hairline,
                            borderRadius: wide ? radius : 0,
                            borderTopLeftRadius: radius,
                            borderTopRightRadius: radius,
                            paddingBottom: wide ? 0 : insets.bottom,
                        },
                    ], children: [_jsxs(View, { style: [styles.titleRow, { borderBottomColor: colors.hairline }], children: [_jsx(Text, { accessibilityRole: "header", numberOfLines: 1, style: [styles.title, { color: colors.text }], children: title }), _jsx(CloseButton, { onPress: onClose })] }), _jsx(ScrollView, { style: styles.scroll, contentContainerStyle: styles.body, children: children }), actions && actions.length > 0 && _jsx(ButtonRow, { actions: actions, bordered: true })] })] }) }));
}
/** The 72 button row shared by sheets and dialogs: equal-width buttons, 12 apart. */
export function ButtonRow({ actions, bordered }) {
    const { colors } = useKit();
    return (_jsx(View, { style: [
            styles.buttonRow,
            bordered && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
            bordered ? styles.buttonRowPad : null,
        ], children: actions.map((a) => (_jsx(Button, { fill: true, size: "md", look: a.look ?? 'secondary', ...a }, a.label))) }));
}
function CloseButton({ onPress }) {
    const { colors, skin } = useKit();
    return (_jsx(Pressable, { accessibilityRole: "button", accessibilityLabel: "Close", hitSlop: 4, onPress: onPress, style: [styles.close, { borderRadius: skin.radius.button, backgroundColor: colors.backgroundElement }], children: _jsx(Text, { style: [styles.closeGlyph, { color: colors.textSecondary }], children: "\u00D7" }) }));
}
const styles = StyleSheet.create({
    backdrop: { flex: 1 },
    centre: { alignItems: 'center', justifyContent: 'center', padding: 24 },
    bottom: { justifyContent: 'flex-end' },
    panel: {
        width: '100%',
        maxWidth: SheetSize.maxWidth,
        maxHeight: '90%',
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
    },
    titleRow: {
        height: SheetSize.titleRow,
        paddingHorizontal: SheetSize.sidePad,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: { flex: 1, fontSize: TypeScale.sheetTitle, fontWeight: '700' },
    close: { width: Height.sm, height: Height.sm, alignItems: 'center', justifyContent: 'center' },
    closeGlyph: { fontSize: TypeScale.body, lineHeight: TypeScale.body + 2 },
    scroll: { flexGrow: 0 },
    body: { padding: SheetSize.bodyPad, gap: 16 },
    buttonRow: { flexDirection: 'row', alignItems: 'center', gap: SheetSize.buttonGap },
    buttonRowPad: { height: SheetSize.buttonRow, paddingHorizontal: SheetSize.sidePad },
});
