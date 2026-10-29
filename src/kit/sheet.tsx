import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Breakpoints } from 'tcgscan-theme';

import { Button, type ButtonLook } from './button';
import { Height, SheetSize, TypeScale } from './scale';
import { useKit } from './skin';
import { useWindowSize } from './window-size';

export interface SheetAction {
  label: string;
  onPress: () => void;
  look?: ButtonLook;
  tone?: 'danger';
  disabled?: boolean;
}

/**
 * A sheet: title row 56, body, button row 72. Buttons live in the bottom row and nowhere else,
 * equal width, 12 apart, safe choice first and the primary last.
 *
 * Bottom-anchored on a phone; a centred panel once the window has room for the rail.
 */
export function Sheet({
  visible,
  title,
  onClose,
  actions,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  actions?: readonly SheetAction[];
  children: ReactNode;
}) {
  const { colors, skin } = useKit();
  const { width } = useWindowSize();
  const insets = useSafeAreaInsets();
  const wide = width >= Breakpoints.rail;
  const radius = skin.radius.sheet;

  return (
    <Modal visible={visible} transparent animationType={wide ? 'fade' : 'slide'} onRequestClose={onClose}>
      <View style={[styles.backdrop, wide ? styles.centre : styles.bottom]}>
        <Pressable
          accessibilityLabel="Close"
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }]}
          onPress={onClose}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.panel,
            {
              backgroundColor: colors.background,
              borderColor: colors.hairline,
              borderRadius: wide ? radius : 0,
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              paddingBottom: wide ? 0 : insets.bottom,
            },
          ]}
        >
          <View style={[styles.titleRow, { borderBottomColor: colors.hairline }]}>
            <Text accessibilityRole="header" numberOfLines={1} style={[styles.title, { color: colors.text }]}>
              {title}
            </Text>
            <CloseButton onPress={onClose} />
          </View>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.body}>
            {children}
          </ScrollView>
          {actions && actions.length > 0 && <ButtonRow actions={actions} bordered />}
        </View>
      </View>
    </Modal>
  );
}

/** The 72 button row shared by sheets and dialogs: equal-width buttons, 12 apart. */
export function ButtonRow({ actions, bordered }: { actions: readonly SheetAction[]; bordered?: boolean }) {
  const { colors } = useKit();
  return (
    <View
      style={[
        styles.buttonRow,
        bordered && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
        bordered ? styles.buttonRowPad : null,
      ]}
    >
      {actions.map((a) => (
        <Button key={a.label} fill size="md" look={a.look ?? 'secondary'} {...a} />
      ))}
    </View>
  );
}

function CloseButton({ onPress }: { onPress: () => void }) {
  const { colors, skin } = useKit();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close"
      hitSlop={4}
      onPress={onPress}
      style={[styles.close, { borderRadius: skin.radius.button, backgroundColor: colors.backgroundElement }]}
    >
      <Text style={[styles.closeGlyph, { color: colors.textSecondary }]}>×</Text>
    </Pressable>
  );
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
