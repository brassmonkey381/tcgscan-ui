import { useEffect, useState, type ReactNode } from 'react';
import { Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { animate, useReduceMotion } from './motion';

import { useKit } from './skin';

/**
 * A pressable on the skin's hardware lip. Without a lip in the skin it is a plain Pressable that
 * dims when pressed, exactly the kit's old behaviour.
 *
 * With one: the control stands `depth` points above a solid edge of the lip colour and sinks onto
 * it while pressed, so a press reads as a key going down. A disabled control loses its lip and sits
 * flat and dimmed, because a key you cannot press should not look pressable. Both changes ease on
 * the kit's motion ladder (press 120 ms, state 200 ms) and are instant under Reduce Motion.
 */
export function LipPressable({
  height,
  radius,
  lipColor,
  disabled,
  onPress,
  surface,
  fill,
  style,
  children,
  accessibility,
}: {
  height: number;
  radius: number;
  /** A colour, or an Animated colour when the lip changes with state (a chip being picked). */
  lipColor: string | Animated.AnimatedInterpolation<string>;
  disabled?: boolean;
  onPress?: () => void;
  /** The control's face: fill, border, padding. May hold Animated values. */
  surface: StyleProp<ViewStyle> | object;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  accessibility: object;
}) {
  const { skin } = useKit();
  const reduce = useReduceMotion();
  const depth = skin.lip ? skin.lip.depth : 0;
  // 1 = pressed down onto the lip, 0 = standing. 1 = enabled, 0 = disabled (flat, dimmed, no lip).
  const [down] = useState(() => new Animated.Value(0));
  const [on] = useState(() => new Animated.Value(disabled ? 0 : 1));
  useEffect(() => {
    animate(on, disabled ? 0 : 1, 'state', { reduce }).start();
  }, [disabled, on, reduce]);
  const press = (to: number) => () => animate(down, to, 'press', { reduce }).start();
  if (!skin.lip) {
    return (
      <AnimatedPressable
        {...accessibility}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press(1)}
        onPressOut={press(0)}
        style={[
          { height, borderRadius: radius },
          surface,
          { opacity: Animated.multiply(on.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }), down.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] })) },
          fill && styles.fill,
          style,
        ]}
      >
        {children}
      </AnimatedPressable>
    );
  }
  // The face sinks by `depth` while pressed and sits flat on the ground when disabled; the lip fades
  // out with it, so a disabled key shows no edge. The box keeps its full height either way, so
  // enabling a button never moves what is below it.
  const sunk = Animated.add(down, Animated.subtract(1, on));
  return (
    <View style={[{ height: height + depth }, fill && styles.fill, style]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { top: depth, borderRadius: radius, backgroundColor: lipColor, opacity: on }]}
      />
      <AnimatedPressable
        {...accessibility}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press(1)}
        onPressOut={press(0)}
        style={[
          { height, borderRadius: radius },
          surface,
          {
            opacity: on.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
            transform: [{ translateY: sunk.interpolate({ inputRange: [0, 1, 2], outputRange: [0, depth, depth], extrapolate: 'clamp' }) }],
          },
        ]}
      >
        {children}
      </AnimatedPressable>
    </View>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Three pixels stepping left to right: a button's loading state, in place of its label. */
export function LoadingDots({ color, size = 6 }: { color: string; size?: number }) {
  const [lit, setLit] = useState(0);
  // Steps, never tweens; under Reduce Motion all three are lit and steady.
  const reduce = useReduceMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLit((n) => (n + 1) % 3), 220);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <View style={styles.dots} aria-hidden>
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ width: size, height: size, backgroundColor: color, opacity: reduce || i === lit ? 1 : 0.3 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, flexShrink: 1, minWidth: 0 },
  dots: { flexDirection: 'row', gap: 4, alignItems: 'center' },
});
