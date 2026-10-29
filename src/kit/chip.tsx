import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChipGap, ControlPad, Height, TypeScale } from './scale';
import { useKit } from './skin';

/** A filter or sort chip. Always the small height; selected is the accent fill. */
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const { colors, skin } = useKit();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderRadius: skin.radius.chip,
          backgroundColor: selected ? colors.accent : colors.backgroundElement,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          { color: selected ? colors.accentText : colors.text, fontWeight: selected ? '600' : '500' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** A row of chips: wraps at 8, never scrolls sideways. */
export function ChipRow({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    height: Height.sm,
    paddingHorizontal: ControlPad.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: TypeScale.meta },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: ChipGap },
});
