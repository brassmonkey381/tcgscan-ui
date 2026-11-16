import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ButtonRow, CloseButton, type SheetAction } from './sheet';
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
  closeButton,
  consequence,
  maxWidth,
}: {
  visible: boolean;
  title: string;
  body?: string;
  cancel: SheetAction;
  confirm: SheetAction;
  onClose: () => void;
  children?: ReactNode;
  /** An X at the right of the title row (v0.14). Off by default so existing dialogs look the same. */
  closeButton?: boolean;
  /**
   * What the action will cost, in a grey block under the title (v0.14): an optional picture, one
   * bold line ("9 pages and 81 cards will be gone") and a detail line. Replaces `body` when both
   * would say the same thing.
   */
  consequence?: { title: string; detail?: string; thumb?: ReactNode };
  /** Width cap (default SheetSize.dialogMaxWidth). */
  maxWidth?: number;
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
            maxWidth ? { maxWidth } : null,
            { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
            edge,
          ]}
        >
          <KitProvider colors={colors} dark={skin.popup ? true : kit.dark} skin={skin}>
          <View style={styles.titleRow}>
            <Text maxFontSizeMultiplier={FontScaleCap.reading} role="heading" style={[styles.title, { color: skin.popup?.title ?? colors.text }, skin.popup?.titleGlow ? GLOW : null]}>{title}</Text>
            {closeButton ? <CloseButton onPress={onClose} /> : null}
          </View>
          {consequence ? (
            <View style={[styles.consequence, { backgroundColor: colors.backgroundElement, borderRadius: skin.radius.panel }]}>
              {consequence.thumb ? <View style={styles.thumb}>{consequence.thumb}</View> : null}
              <View style={styles.consequenceText}>
                <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.consequenceTitle, { color: colors.text }]}>{consequence.title}</Text>
                {consequence.detail ? <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.consequenceDetail, { color: colors.textSecondary }]}>{consequence.detail}</Text> : null}
              </View>
            </View>
          ) : null}
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
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { flex: 1, fontSize: TypeScale.sheetTitle, lineHeight: 28, fontWeight: '700' },
  consequence: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  thumb: { flexShrink: 0 },
  consequenceText: { flex: 1, gap: 2 },
  consequenceTitle: { fontSize: TypeScale.control, lineHeight: 20, fontWeight: '700' },
  consequenceDetail: { fontSize: TypeScale.meta, lineHeight: 18 },
  body: { fontSize: TypeScale.control, lineHeight: 21 },
});
