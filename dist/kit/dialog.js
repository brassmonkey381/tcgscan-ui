import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonRow } from './sheet';
import { SheetSize, TypeScale } from './scale';
import { useKit } from './skin';
/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 */
export function Dialog({ visible, title, body, cancel, confirm, onClose, }) {
    const { colors, skin } = useKit();
    return (_jsx(Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onClose, children: _jsxs(View, { style: styles.backdrop, children: [_jsx(Pressable, { accessibilityLabel: "Close", style: [StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }], onPress: onClose }), _jsxs(View, { accessibilityViewIsModal: true, accessibilityRole: "alert", style: [
                        styles.box,
                        { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
                    ], children: [_jsx(Text, { style: [styles.title, { color: colors.text }], children: title }), body ? _jsx(Text, { style: [styles.body, { color: colors.textSecondary }], children: body }) : null, _jsx(ButtonRow, { actions: [cancel, { look: 'primary', ...confirm }] })] })] }) }));
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
    title: { fontSize: TypeScale.sheetTitle, lineHeight: 22, fontWeight: '700' },
    body: { fontSize: TypeScale.control, lineHeight: 21 },
});
