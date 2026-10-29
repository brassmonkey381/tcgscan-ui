import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ButtonRow, type SheetAction } from './sheet';
import { SheetSize, TypeScale } from './scale';
import { useKit } from './skin';

/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 */
export function Dialog({
  visible,
  title,
  body,
  cancel,
  confirm,
  onClose,
}: {
  visible: boolean;
  title: string;
  body?: string;
  cancel: SheetAction;
  confirm: SheetAction;
  onClose: () => void;
}) {
  const { colors, skin } = useKit();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable
          accessibilityLabel="Close"
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim55 }]}
          onPress={onClose}
        />
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            styles.box,
            { backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.dialog },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {body ? <Text style={[styles.body, { color: colors.textSecondary }]}>{body}</Text> : null}
          <ButtonRow actions={[cancel, { look: 'primary', ...confirm }]} />
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
  title: { fontSize: TypeScale.sheetTitle, lineHeight: 22, fontWeight: '700' },
  body: { fontSize: TypeScale.control, lineHeight: 21 },
});
