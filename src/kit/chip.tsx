import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LipPressable } from './lip';

import { ChipGap, ControlPad, Height, TypeScale } from './scale';
import { useKit } from './skin';

/**
 * A filter or sort chip. Always the small height; selected is the accent fill. On a lipped skin it
 * stands on the lip like a button, because it is one (owner, 2026-10-30).
 */
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
    <LipPressable
      accessibility={{ accessibilityRole: 'button', accessibilityState: { selected: !!selected } }}
      height={Height.sm}
      radius={skin.radius.chip}
      lipColor={selected ? (skin.lip?.primary ?? 'transparent') : (skin.lip?.secondary ?? 'transparent')}
      onPress={onPress}
      surface={[
        styles.chip,
        {
          backgroundColor: selected ? colors.accent : colors.backgroundElement,
          borderWidth: !selected && skin.lip ? 1.5 : 0,
          borderColor: colors.controlBorder,
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
    </LipPressable>
  );
}

/** A row of chips: wraps at 8, never scrolls sideways. */
export function ChipRow({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: ControlPad.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: TypeScale.meta },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: ChipGap },
});
