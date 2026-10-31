import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MinTouch, TypeScale } from './scale';
import { useKit } from './skin';

/**
 * A checkbox: a 22 square in a 44 target. Checked is the skin's check fill with its tick (BiBo: a
 * navy square, a glowing cyan tick); unchecked is the empty square. With `label` the whole row is
 * the target.
 */
export function Check({
  checked,
  onPress,
  label,
  accessibilityLabel,
  disabled,
}: {
  checked: boolean;
  onPress?: () => void;
  label?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}) {
  const { colors, skin } = useKit();
  const fill = skin.check?.fill ?? colors.text;
  const tick = skin.check?.tick ?? colors.background;
  const box = (
    <View
      style={[
        styles.box,
        { borderRadius: Math.min(6, skin.radius.chip) },
        checked
          ? { backgroundColor: fill }
          : { borderWidth: 2, borderColor: skin.check ? fill : colors.controlBorder, backgroundColor: skin.check ? fill : 'transparent' },
      ]}
    >
      {checked ? (
        <Text
          style={[
            styles.tick,
            { color: tick },
            skin.check?.glow ? { textShadowColor: tick, textShadowRadius: 6, textShadowOffset: { width: 0, height: 0 } } : null,
          ]}
        >
          ✓
        </Text>
      ) : null}
    </View>
  );
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled || !onPress}
      onPress={onPress}
      hitSlop={label ? undefined : (MinTouch - 22) / 2}
      style={({ pressed }) => [styles.row, { opacity: disabled ? 0.45 : pressed ? 0.8 : 1 }]}
    >
      {box}
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 22 },
  box: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  tick: { fontSize: 14, lineHeight: 16, fontWeight: '800' },
  label: { fontSize: TypeScale.control, flexShrink: 1 },
});
