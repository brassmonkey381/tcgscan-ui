import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { LipPressable, LoadingDots } from './lip';

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
 *
 * On a skin with a lip (BiBo) every look but quiet stands on it and sinks onto it when pressed;
 * `loading` swaps the label for stepping pixels and holds the button, and `disabled` drops the lip
 * and dims it.
 */
export type ButtonLook = 'primary' | 'secondary' | 'selected' | 'quiet';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  look?: ButtonLook;
  size?: ControlSize;
  tone?: 'danger';
  disabled?: boolean;
  /** Working on it: the label becomes stepping pixels and presses are ignored. */
  loading?: boolean;
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
  loading,
  fill,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const kit = useKit();
  const paint = lookColors(kit, look, tone);
  const lip = kit.skin.lip;
  const lipped = !!lip && look !== 'quiet';
  const underline = look === 'quiet' && kit.skin.ink?.linkUnderline;
  const body = (
    <View style={styles.inner}>
      {loading ? (
        <LoadingDots color={paint.text} />
      ) : (
        <Text
          numberOfLines={1}
          style={[styles.label, { fontSize: ControlText[size], color: paint.text }, underline && styles.underline]}
        >
          {label}
        </Text>
      )}
    </View>
  );
  const surface = [
    styles.base,
    {
      paddingHorizontal: look === 'quiet' ? ControlPad.sm : ControlPad[size],
      backgroundColor: paint.fill,
      borderColor: paint.border,
      borderWidth: paint.border ? 1.5 : 0,
    },
    // A lipped skin's lip IS the primary's edge; the old drop shadow is for flat skins only.
    !lipped && look === 'primary' && !tone && kit.skin.primaryShadow,
  ];
  return (
    <LipPressable
      accessibility={{
        accessibilityRole: 'button',
        accessibilityLabel: accessibilityLabel ?? label,
        accessibilityState: { disabled: !!disabled || !!loading, selected: look === 'selected', busy: !!loading },
      }}
      height={Height[size]}
      radius={kit.skin.radius.button}
      lipColor={lipped ? (look === 'primary' && !tone ? lip!.primary : lip!.secondary) : 'transparent'}
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      surface={surface}
      fill={fill}
      style={style}
    >
      {body}
    </LipPressable>
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
  // No flex: 1. A stretching label box in a row that gives the button no width collapses to
  // nothing on native (the label vanished in a header on iOS, 2026-10-31); it sizes to its label.
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '600' },
  underline: { textDecorationLine: 'underline' },
});
