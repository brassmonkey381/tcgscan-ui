import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text } from 'react-native';

import { useKit } from './skin';

const W = 64;
const H = 30;
const KNOB = 22;
const PAD = 4;

/**
 * An on/off switch that says which it is: the state is written in the track beside the knob, the
 * track changes colour, and the knob slides, all animated (owner, 2026-10-31: a change of state
 * always animates). Colours come from KitSkin.switch; without it, the palette's accent and panel.
 */
export function Switch({
  value,
  onValueChange,
  accessibilityLabel,
  disabled,
}: {
  value: boolean;
  onValueChange: (next: boolean) => void;
  accessibilityLabel?: string;
  disabled?: boolean;
}) {
  const { colors, skin } = useKit();
  const sw = skin.switch;
  const [t] = useState(() => new Animated.Value(value ? 1 : 0));
  useEffect(() => {
    Animated.timing(t, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [value, t]);
  const track = t.interpolate({
    inputRange: [0, 1],
    outputRange: [sw?.offTrack ?? colors.backgroundElement, sw?.onTrack ?? colors.accent],
  });
  const x = t.interpolate({ inputRange: [0, 1], outputRange: [PAD, W - KNOB - PAD] });
  const offOpacity = t.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      hitSlop={7}
      style={{ opacity: disabled ? 0.45 : 1 }}
    >
      <Animated.View style={[styles.track, { backgroundColor: track }]}>
        <Animated.View style={[styles.word, styles.wordOn, { opacity: t }]}>
          <Text style={[styles.wordText, { color: sw?.onText ?? colors.accentText }, sw?.face]}>ON</Text>
        </Animated.View>
        <Animated.View style={[styles.word, styles.wordOff, { opacity: offOpacity }]}>
          <Text style={[styles.wordText, { color: sw?.offText ?? colors.textSecondary }, sw?.face]}>OFF</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.knob,
            {
              backgroundColor: sw?.knob ?? colors.background,
              borderColor: sw?.knobEdge ?? 'transparent',
              borderWidth: sw?.knobEdge ? 2 : 0,
              transform: [{ translateX: x }],
            },
            sw?.knobLip
              ? { shadowColor: sw.knobLip, shadowOpacity: 1, shadowRadius: 0, shadowOffset: { width: 0, height: 3 } }
              : null,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

/** For a host that lays out its own switch row. */
export const SwitchSize = { width: W, height: H } as const;

const styles = StyleSheet.create({
  track: { width: W, height: H, borderRadius: H / 2, justifyContent: 'center' },
  knob: { position: 'absolute', top: (H - KNOB) / 2, left: 0, width: KNOB, height: KNOB, borderRadius: KNOB / 2 },
  word: { position: 'absolute', top: 0, bottom: 0, justifyContent: 'center' },
  wordOn: { left: 9 },
  wordOff: { right: 8 },
  wordText: { fontSize: 10, letterSpacing: 0.5, fontWeight: '700' },
});
