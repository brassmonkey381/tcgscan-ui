import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonRow } from './sheet';
import { SheetSize, TypeScale } from './scale';
import { GLOW, popupColors } from './popup';
import { KitProvider, useKit } from './skin';
/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 */
export function Dialog({ visible, title, body, cancel, confirm, onClose, }) {
    const kit = useKit();
    const { skin } = kit;
    // Inside a pop-up everything draws in the skin's popup palette (or the page's, without one).
    const colors = popupColors(kit);
    const edge = skin.popup?.edge ? { borderTopWidth: skin.popup.edgeWidth ?? 5, borderTopColor: skin.popup.edge } : null;
    return (_jsx(Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onClose, children: _jsxs(View, { style: styles.backdrop, children: [_jsx(Pressable, { accessibilityLabel: "Close", style: [StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }], onPress: onClose }), _jsx(View, { accessibilityViewIsModal: true, accessibilityRole: "alert", style: [
                        styles.box,
                        { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
                        edge,
                    ], children: _jsxs(KitProvider, { colors: colors, dark: skin.popup ? true : kit.dark, skin: skin, children: [_jsx(Text, { style: [styles.title, { color: skin.popup?.title ?? colors.text }, skin.popup?.titleGlow ? GLOW : null], children: title }), body ? _jsx(Text, { style: [styles.body, { color: colors.textSecondary }], children: body }) : null, _jsx(ButtonRow, { actions: [cancel, { look: 'primary', ...confirm }] })] }) })] }) }));
}
const styles = StyleSheet.create({
    backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    box: {
        width: '100%',
        maxWidth: SheetSize.dialogMaxWidth,
        padding: SheetSize.dialogPad,
        gap: 16,
        borderWidth: StyleSheet.hairlineWidth,
    },
    title: { fontSize: TypeScale.sheetTitle, lineHeight: 28, fontWeight: '700' },
    body: { fontSize: TypeScale.control, lineHeight: 21 },
});
