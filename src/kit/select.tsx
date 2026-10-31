import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Height, TypeScale } from './scale';
import { useKit } from './skin';

/**
 * A dropdown's closed face: the chosen value in a field and a chevron box on its right edge, so it
 * reads as "choose from a list" rather than as a button or as text (owner's pick, 2026-10-31: a white
 * field with a navy chevron box). It opens nothing itself; the host opens its list on press.
 */
export function SelectTrigger({
  value,
  onPress,
  accessibilityLabel,
  size = 'md',
  disabled,
}: {
  value: string;
  onPress: () => void;
  accessibilityLabel?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}) {
  const { colors, skin } = useKit();
  const h = size === 'sm' ? Height.sm : Height.md;
  const field = skin.field;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? value}
      accessibilityHint="Opens a list"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.box,
        {
          height: h,
          borderRadius: skin.radius.input,
          backgroundColor: field?.fill ?? colors.background,
          borderColor: field?.border ?? colors.hairlineStrong,
          borderWidth: field?.borderWidth ?? 1,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.value,
          { color: field?.text ?? colors.text, fontSize: size === 'sm' ? TypeScale.meta : TypeScale.control },
        ]}
      >
        {value}
      </Text>
      <View style={[styles.chevronBox, { backgroundColor: field?.border ?? colors.text }]}>
        <Text style={[styles.chevron, { color: colors.accent }]}>▾</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'stretch', overflow: 'hidden', alignSelf: 'flex-start', maxWidth: '100%' },
  value: { alignSelf: 'center', paddingHorizontal: 12, fontWeight: '700', flexShrink: 1 },
  chevronBox: { width: 30, alignItems: 'center', justifyContent: 'center' },
  chevron: { fontSize: 14, fontWeight: '800' },
});
