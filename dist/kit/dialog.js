import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonRow, CloseButton } from './sheet';
import { SheetSize, TypeScale, FontScaleCap } from './scale';
import { GLOW, popupColors } from './popup';
import { KitProvider, useKit } from './skin';
/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 *
 * `children` sit between the body and the buttons: a typed field (a collection name, DELETE), a
 * preview line or a third answer, so every question in an app can be this one dialog.
 */
/**
 * How long a closing pop-up takes to leave. A layer opened from a closing layer starts after this,
 * so two pop-ups never cross (and iOS never shows two Modals at once).
 */
export const POPUP_DISMISS_MS = 350;
export function Dialog({ visible, title, body, cancel, confirm, onClose, children, closeButton, consequence, maxWidth, }) {
    const kit = useKit();
    const { skin } = kit;
    // Inside a pop-up everything draws in the skin's popup palette (or the page's, without one).
    const colors = popupColors(kit);
    const edge = skin.popup?.edge ? { borderTopWidth: skin.popup.edgeWidth ?? 5, borderTopColor: skin.popup.edge } : null;
    return (_jsx(Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onClose, children: _jsxs(View, { style: styles.backdrop, children: [_jsx(Pressable, { accessibilityLabel: "Close", style: [StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }], onPress: onClose }), _jsx(View, { "aria-modal": true, style: [
                        styles.box,
                        maxWidth ? { maxWidth } : null,
                        { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
                        edge,
                    ], children: _jsxs(KitProvider, { colors: colors, dark: skin.popup ? true : kit.dark, skin: skin, children: [_jsxs(View, { style: styles.titleRow, children: [_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, role: "heading", style: [styles.title, { color: skin.popup?.title ?? colors.text }, skin.popup?.titleGlow ? GLOW : null], children: title }), closeButton ? _jsx(CloseButton, { onPress: onClose }) : null] }), consequence ? (_jsxs(View, { style: [styles.consequence, { backgroundColor: colors.backgroundElement, borderRadius: skin.radius.panel }], children: [consequence.thumb ? _jsx(View, { style: styles.thumb, children: consequence.thumb }) : null, _jsxs(View, { style: styles.consequenceText, children: [_jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.consequenceTitle, { color: colors.text }], children: consequence.title }), consequence.detail ? _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.consequenceDetail, { color: colors.textSecondary }], children: consequence.detail }) : null] })] })) : null, body ? _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.reading, style: [styles.body, { color: colors.textSecondary }], children: body }) : null, children, _jsx(ButtonRow, { actions: [cancel, { look: 'primary', ...confirm }] })] }) })] }) }));
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
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    title: { flex: 1, fontSize: TypeScale.sheetTitle, lineHeight: 28, fontWeight: '700' },
    consequence: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
    thumb: { flexShrink: 0 },
    consequenceText: { flex: 1, gap: 2 },
    consequenceTitle: { fontSize: TypeScale.control, lineHeight: 20, fontWeight: '700' },
    consequenceDetail: { fontSize: TypeScale.meta, lineHeight: 18 },
    body: { fontSize: TypeScale.control, lineHeight: 21 },
});
