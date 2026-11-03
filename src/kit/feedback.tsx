import { useEffect, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';

import { Button } from './button';
import { Loading } from './loading';
import { animate, useReduceMotion } from './motion';
import { TypeScale } from './scale';
import { useKit } from './skin';

/**
 * The owner's feedback picks (Style Picker v2, 2026-11-02): one error line, one note, one banner
 * and one wait, so no screen draws its own. Colours come from the palette in force, so inside a
 * pop-up (PopupSurface, Sheet, Dialog) they take the pop-up's on-navy values.
 */

/** Fades in and rises 4pt on the motion ladder's state step; a plain fade under Reduce Motion. */
function useArrive() {
  const reduce = useReduceMotion();
  const [t] = useState(() => new Animated.Value(0));
  useEffect(() => {
    animate(t, 1, 'state', { reduce, fade: true }).start();
  }, [t, reduce]);
  return {
    opacity: t,
    transform: reduce ? [] : [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }],
  };
}

/**
 * A failure line: caption 13/18, weight 600, the danger colour, no box or icon. It sits directly
 * under the control that failed, inside the same group, and is announced to screen readers.
 */
export function ErrorText({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { colors } = useKit();
  const arrive = useArrive();
  return (
    <Animated.View style={[styles.errorBox, arrive, style]}>
      <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={[styles.error, { color: colors.danger }]}>
        {children}
      </Text>
    </Animated.View>
  );
}

export type NoteTone = 'muted' | 'warning' | 'danger';

/**
 * A note: a hint, fine print, a result line, a caveat, a status. Caption 13/18. `working` adds the
 * stepping pixels before it (a line that says something is still going on).
 */
export function Note({
  children,
  tone = 'muted',
  align,
  working,
  style,
}: {
  children: ReactNode;
  tone?: NoteTone;
  align?: 'left' | 'center' | 'right';
  working?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useKit();
  const color = tone === 'danger' ? colors.danger : tone === 'warning' ? colors.warning : colors.textSecondary;
  const text = (
    <Text accessibilityRole={tone === 'danger' ? 'alert' : undefined} style={[styles.note, { color, textAlign: align }]}>
      {children}
    </Text>
  );
  if (!working) return <View style={style}>{text}</View>;
  return (
    <View style={[styles.workingRow, align === 'center' && styles.centre, style]}>
      <Loading size={5} />
      <View style={styles.flexText}>{text}</View>
    </View>
  );
}

/**
 * A banner: a soft card (the Cards pick: no edge, the panel radius, padding 12) with a message,
 * an optional title and an optional small primary at its right end, which wraps under the text on
 * narrow windows. It stays where it is until its condition clears; it has no close button.
 */
export function Banner({
  message,
  title,
  action,
  style,
}: {
  message: ReactNode;
  title?: string;
  action?: { label: string; onPress: () => void; loading?: boolean };
  style?: StyleProp<ViewStyle>;
}) {
  const { colors, skin } = useKit();
  const { width } = useWindowDimensions();
  const arrive = useArrive();
  const stack = width < 360;
  return (
    <Animated.View
      style={[
        styles.banner,
        { backgroundColor: colors.backgroundElement, borderRadius: skin.radius.panel },
        stack && styles.bannerStack,
        arrive,
        style,
      ]}
    >
      <View style={styles.flexText}>
        {title ? <Text style={[styles.bannerTitle, { color: (colors as { heading?: string }).heading ?? colors.text }]}>{title}</Text> : null}
        {typeof message === 'string' ? <Text style={[styles.bannerText, { color: colors.text }]}>{message}</Text> : message}
      </View>
      {action ? <Button look="primary" size="sm" label={action.label} loading={action.loading} onPress={action.onPress} /> : null}
    </Animated.View>
  );
}

/**
 * The wait rule: for the first 400 ms nothing new is drawn (most local reads finish inside it, so
 * the loader never flashes), then the kit Loading, centred in the slot; at 8 s a line under it says
 * the wait is long. The slot keeps `minHeight` the whole time, so nothing jumps.
 */
export function Wait({ label, minHeight, style }: { label?: string; minHeight?: number; style?: StyleProp<ViewStyle> }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const a = setTimeout(() => setStage(1), 400);
    const b = setTimeout(() => setStage(2), 8000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  return (
    <View style={[styles.wait, { minHeight }, style]}>
      {stage >= 1 ? <Loading label={label} /> : null}
      {stage === 2 ? <Note align="center">This is taking longer than usual.</Note> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorBox: { marginTop: 4 },
  error: { fontSize: TypeScale.meta, lineHeight: 18, fontWeight: '600' },
  note: { fontSize: TypeScale.meta, lineHeight: 18 },
  workingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  centre: { justifyContent: 'center' },
  flexText: { flex: 1, minWidth: 0, gap: 2 },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  bannerStack: { flexDirection: 'column', alignItems: 'stretch' },
  bannerTitle: { fontSize: TypeScale.body, lineHeight: 23, fontWeight: '700' },
  bannerText: { fontSize: TypeScale.control, lineHeight: 21 },
  wait: { alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12 },
});
