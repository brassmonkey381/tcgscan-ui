import { useEffect, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { LipPressable } from './lip';
import { animate, useReduceMotion } from './motion';

import { ChipGap, ControlPad, Height, TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';

/**
 * A filter or sort chip. Always the small height; selected is the accent fill. On a lipped skin it
 * stands on the lip like a button, because it is one (owner, 2026-10-30).
 *
 * Picking and unpicking fades the face, label and lip over the motion ladder's state step.
 * `tone: 'danger'` lights it in the danger tint instead (a mode that removes a safety, such as
 * Quick delete). `icon` leads the label. `role: 'switch'` makes it an on/off control for screen
 * readers (the collection toolbar modes); the default is a button with a selected state.
 */
export function Chip({
  label,
  selected,
  onPress,
  tone,
  icon,
  role = 'button',
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  tone?: 'danger';
  icon?: ReactNode;
  role?: 'button' | 'switch';
}) {
  const { colors, skin } = useKit();
  const reduce = useReduceMotion();
  const [t] = useState(() => new Animated.Value(selected ? 1 : 0));
  useEffect(() => {
    animate(t, selected ? 1 : 0, 'state', { reduce, fade: true }).start();
  }, [selected, t, reduce]);
  const onFace = tone === 'danger' ? colors.dangerBg : colors.accent;
  const onText = tone === 'danger' ? colors.danger : colors.accentText;
  const onLip = tone === 'danger' ? (skin.lip?.secondary ?? 'transparent') : (skin.lip?.primary ?? 'transparent');
  const offLip = skin.lip?.secondary ?? 'transparent';
  const mix = (a: string, b: string) => t.interpolate({ inputRange: [0, 1], outputRange: [a, b] });
  return (
    <LipPressable
      accessibility={
        role === 'switch'
          ? { accessibilityRole: 'switch', accessibilityLabel: label, accessibilityState: { checked: !!selected } }
          : { accessibilityRole: 'button', accessibilityState: { selected: !!selected } }
      }
      height={Height.sm}
      radius={skin.radius.chip}
      lipColor={mix(offLip, onLip)}
      onPress={onPress}
      surface={[
        styles.chip,
        {
          backgroundColor: mix(colors.backgroundElement, onFace),
          borderWidth: skin.lip ? 1.5 : 0,
          borderColor: mix(colors.controlBorder, onFace),
        },
      ]}
    >
      {icon}
      <Animated.Text maxFontSizeMultiplier={FontScaleCap.control} selectable={false}
        numberOfLines={1}
        style={[styles.label, { color: mix(colors.text, onText), fontWeight: selected ? '600' : '500' }]}
      >
        {label}
      </Animated.Text>
    </LipPressable>
  );
}

/** A row of chips: wraps at 8, never scrolls sideways. */
export function ChipRow({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: ControlPad.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: TypeScale.meta },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: ChipGap },
});
