import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ButtonRow, type SheetAction } from './sheet';
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
export function Dialog({
  visible,
  title,
  body,
  cancel,
  confirm,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  body?: string;
  cancel: SheetAction;
  confirm: SheetAction;
  onClose: () => void;
  children?: ReactNode;
}) {
  const kit = useKit();
  const { skin } = kit;
  // Inside a pop-up everything draws in the skin's popup palette (or the page's, without one).
  const colors = popupColors(kit);
  const edge = skin.popup?.edge ? { borderTopWidth: skin.popup.edgeWidth ?? 5, borderTopColor: skin.popup.edge } : null;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable
          accessibilityLabel="Close"
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }]}
          onPress={onClose}
        />
        <View
          aria-modal
          style={[
            styles.box,
            { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
            edge,
          ]}
        >
          <KitProvider colors={colors} dark={skin.popup ? true : kit.dark} skin={skin}>
          <Text maxFontSizeMultiplier={FontScaleCap.reading} role="heading" style={[styles.title, { color: skin.popup?.title ?? colors.text }, skin.popup?.titleGlow ? GLOW : null]}>{title}</Text>
          {body ? <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.body, { color: colors.textSecondary }]}>{body}</Text> : null}
          {children}
          <ButtonRow actions={[cancel, { look: 'primary', ...confirm }]} />
          </KitProvider>
        </View>
      </View>
    </Modal>
  );
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
