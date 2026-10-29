import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { ControlPad, ControlText, Height, type ControlSize } from './scale';
import { useKit, type KitValue } from './skin';

/**
 * The four looks, and only four. One primary per view.
 *
 *   primary    accent fill, accentText label. The one action the view is for.
 *   secondary  panel grey. Everything else that is a button.
 *   selected   link ring on the surface, link label. The chosen option of a set.
 *   quiet      text only, for Cancel and links inside a row.
 *
 * `tone: 'danger'` is Secondary in the danger tint, never red text alone.
 */
export type ButtonLook = 'primary' | 'secondary' | 'selected' | 'quiet';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  look?: ButtonLook;
  size?: ControlSize;
  tone?: 'danger';
  disabled?: boolean;
  /** Stretch to share a row equally (sheet and dialog button rows). */
  fill?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  look = 'secondary',
  size = 'md',
  tone,
  disabled,
  fill,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const kit = useKit();
  const paint = lookColors(kit, look, tone);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled, selected: look === 'selected' }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height: Height[size],
          paddingHorizontal: look === 'quiet' ? ControlPad.sm : ControlPad[size],
          borderRadius: kit.skin.radius.button,
          backgroundColor: paint.fill,
          borderColor: paint.border,
          borderWidth: paint.border ? 1.5 : 0,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
        look === 'primary' && !tone && kit.skin.primaryShadow,
        fill && styles.fill,
        style,
      ]}
    >
      <Text numberOfLines={1} style={[styles.label, { fontSize: ControlText[size], color: paint.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function lookColors({ colors }: KitValue, look: ButtonLook, tone?: 'danger') {
  if (tone === 'danger') {
    return { fill: colors.dangerBg, text: colors.danger, border: undefined };
  }
  switch (look) {
    case 'primary':
      return { fill: colors.accent, text: colors.accentText, border: undefined };
    case 'selected':
      // `link`, not `accent`: the accent is a fill colour, and a yellow ring vanishes on paper.
      return { fill: colors.background, text: colors.link, border: colors.link };
    case 'quiet':
      return { fill: 'transparent', text: colors.link, border: undefined };
    default:
      return { fill: colors.backgroundElement, text: colors.text, border: undefined };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fill: { flex: 1, flexShrink: 1, minWidth: 0 },
  label: { fontWeight: '600' },
});
