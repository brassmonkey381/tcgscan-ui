import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ControlPad, Height, SegPad, TypeScale, type ControlSize } from './scale';
import { useKit } from './skin';

export interface SegOption<T extends string> {
  value: T;
  label: string;
}

/**
 * A segment group: a panel-grey track, padded 2, with the chosen option lifted onto the surface.
 * `md` (44 outside) in sheets and forms, `sm` (36) inside rows and inspector sections.
 */
export function Seg<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  accessibilityLabel,
}: {
  options: readonly SegOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: Exclude<ControlSize, 'lg'>;
  accessibilityLabel?: string;
}) {
  const { colors, skin } = useKit();
  const inner = Height[size] - SegPad * 2;
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.track,
        { height: Height[size], borderRadius: skin.radius.chip, backgroundColor: colors.backgroundElement },
        skin.lip ? { borderWidth: 1.5, borderColor: colors.controlBorder } : null,
      ]}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            style={[
              styles.option,
              { height: inner, borderRadius: skin.radius.chip },
              on && [styles.on, { backgroundColor: skin.lip ? colors.accent : colors.background }],
              // On a lipped skin the chosen segment is a pressed-in key: the accent fill on its lip.
              on && skin.lip ? { borderBottomWidth: 3, borderBottomColor: skin.lip.primary } : null,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                { color: on ? (skin.lip ? colors.accentText : colors.text) : colors.textSecondary, fontWeight: on ? '600' : '500' },
              ]}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: SegPad,
    gap: SegPad,
  },
  option: {
    paddingHorizontal: ControlPad.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // The one allowed lift inside a control: the chosen segment sits on the surface.
  on: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  label: { fontSize: TypeScale.meta },
});
