import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Height, TypeScale } from './scale';
import { useKit, type InputSkin } from './skin';

/**
 * A text input, always 44 tall so it sits on one baseline with the medium button beside it.
 * `shape: 'search'` is the pill used in workbench headers; `field` takes the input radius.
 *
 * A skin with `input` (BiBo) draws it as a screen: its fill, its text colour and face, and with
 * `marquee` a placeholder that scrolls sideways like a ticker while the field is empty and idle.
 */
export function Input({
  label,
  shape = 'field',
  style,
  ...rest
}: TextInputProps & { label?: string; shape?: 'field' | 'search' }) {
  const { colors, skin } = useKit();
  const radius = shape === 'search' ? skin.radius.chip : skin.radius.input;
  const pad = shape === 'search' ? 14 : 12;
  // The screen look is for SEARCH only; a plain field (a name, a note) takes the skin's field look.
  const input = skin.input && shape === 'search' ? (
    <ScreenInput
      {...rest}
      // A screen field on a surface that is already that screen (a navy pop-up) steps up one shade.
      screen={skin.input.fill === colors.background ? { ...skin.input, fill: colors.backgroundElement } : skin.input}
      radius={radius}
      pad={pad}
      style={style}
      label={label}
    />
  ) : (
    <TextInput
      placeholderTextColor={colors.textSecondary}
      accessibilityLabel={rest.accessibilityLabel ?? label ?? rest.placeholder}
      {...rest}
      style={[
        styles.input,
        {
          borderRadius: radius,
          paddingHorizontal: pad,
          borderColor: colors.hairlineStrong,
          backgroundColor: colors.background,
          color: colors.text,
        },
        skin.field
          ? { backgroundColor: skin.field.fill, borderColor: skin.field.border, borderWidth: skin.field.borderWidth, color: skin.field.text }
          : null,
        style,
      ]}
    />
  );
  if (!label) return input;
  return (
    <View style={styles.labelled}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {input}
    </View>
  );
}

function ScreenInput({
  screen,
  radius,
  pad,
  style,
  label,
  ...rest
}: TextInputProps & { screen: InputSkin; radius: number; pad: number; label?: string }) {
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState(!!(rest.value ?? rest.defaultValue));
  const empty = rest.value !== undefined ? !rest.value : !typed;
  const ticker = !!screen.marquee && !!rest.placeholder && empty && !focused;
  return (
    <View style={[styles.input, styles.screen, { borderRadius: radius, backgroundColor: screen.fill }, style]}>
      <TextInput
        accessibilityLabel={rest.accessibilityLabel ?? label ?? rest.placeholder}
        placeholderTextColor={screen.placeholder}
        {...rest}
        // While the ticker runs it IS the placeholder; the real one returns on focus.
        placeholder={ticker ? undefined : rest.placeholder}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        onChangeText={(t) => {
          setTyped(!!t);
          rest.onChangeText?.(t);
        }}
        style={[styles.screenText, { paddingHorizontal: pad, color: screen.text }, screen.face]}
      />
      {ticker ? <Ticker text={rest.placeholder!} color={screen.placeholder} face={screen.face} pad={pad} /> : null}
    </View>
  );
}

/** The placeholder sliding right to left across the field, then again, at a reading pace. */
function Ticker({ text, color, face, pad }: { text: string; color: string; face?: object; pad: number }) {
  const [box, setBox] = useState(0);
  const [w, setW] = useState(0);
  const [x] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!box || !w) return;
    // Start just inside the left edge, scroll until the text has left, then come back in from the right.
    const speed = 40; // points per second
    x.setValue(pad);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(x, { toValue: -w, duration: ((w + pad) / speed) * 1000, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(x, { toValue: box, duration: 0, useNativeDriver: true }),
        Animated.timing(x, { toValue: pad, duration: ((box - pad) / speed) * 1000, easing: Easing.linear, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [box, w, pad, x]);
  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      onLayout={(e) => setBox(e.nativeEvent.layout.width)}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.Text
        numberOfLines={1}
        onLayout={(e) => setW(e.nativeEvent.layout.width)}
        style={[styles.ticker, { color, transform: [{ translateX: x }] }, face]}
      >
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: Height.md,
    borderWidth: 1,
    fontSize: TypeScale.control,
    minWidth: 0,
  },
  screen: { borderWidth: 0, overflow: 'hidden', justifyContent: 'center' },
  screenText: { height: Height.md, fontSize: TypeScale.meta, minWidth: 0 },
  ticker: { position: 'absolute', top: 0, bottom: 0, left: 0, fontSize: TypeScale.meta, lineHeight: Height.md, flexShrink: 0 },
  labelled: { gap: 6 },
  label: { fontSize: TypeScale.meta, fontWeight: '600' },
});
