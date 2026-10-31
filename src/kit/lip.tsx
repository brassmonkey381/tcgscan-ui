import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useKit } from './skin';

/**
 * A pressable on the skin's hardware lip. Without a lip in the skin it is a plain Pressable that
 * dims when pressed, exactly the kit's old behaviour.
 *
 * With one: the control stands `depth` points above a solid edge of the lip colour and sinks onto
 * it while pressed, so a press reads as a key going down. A disabled control loses its lip and sits
 * flat and dimmed, because a key you cannot press should not look pressable.
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
  lipColor: string;
  disabled?: boolean;
  onPress?: () => void;
  /** The control's face: fill, border, padding. */
  surface: StyleProp<ViewStyle>;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  accessibility: object;
}) {
  const { skin } = useKit();
  const depth = skin.lip && !disabled ? skin.lip.depth : 0;
  if (!skin.lip) {
    return (
      <Pressable
        {...accessibility}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [{ height, borderRadius: radius }, surface, { opacity: disabled ? 0.45 : pressed ? 0.8 : 1 }, fill && styles.fill, style]}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View style={[{ height: height + depth }, fill && styles.fill, style]}>
      {depth ? <View style={[StyleSheet.absoluteFill, { top: depth, borderRadius: radius, backgroundColor: lipColor }]} /> : null}
      <Pressable
        {...accessibility}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          { height, borderRadius: radius },
          surface,
          { opacity: disabled ? 0.45 : 1, transform: [{ translateY: pressed ? depth : 0 }] },
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

/** Three pixels stepping left to right: a button's loading state, in place of its label. */
export function LoadingDots({ color, size = 6 }: { color: string; size?: number }) {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLit((n) => (n + 1) % 3), 220);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ width: size, height: size, backgroundColor: color, opacity: i === lit ? 1 : 0.3 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, flexShrink: 1, minWidth: 0 },
  dots: { flexDirection: 'row', gap: 4, alignItems: 'center' },
});
