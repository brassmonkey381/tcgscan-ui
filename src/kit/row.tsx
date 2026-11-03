import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RowSize, TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';

/**
 * A settings / inspector row: 48 tall, control at the right edge.
 *
 * Two shapes from one component:
 *   list       leading glyph · label (fills) · value · control       (`labelColumn` off)
 *   inspector  label in a fixed 96 column · control fills after it   (`labelColumn` on)
 */
export function Row({
  label,
  value,
  leading,
  children,
  labelColumn,
  onPress,
  caption,
  wrap,
}: {
  label: string;
  /** A line under the label that explains the setting (the row grows to fit). */
  caption?: string;
  /** Let a long label wrap instead of cutting it to one line. */
  wrap?: boolean;
  value?: string;
  leading?: ReactNode;
  /** The control. */
  children?: ReactNode;
  labelColumn?: boolean;
  onPress?: () => void;
}) {
  const { colors } = useKit();
  const body = (
    <>
      {leading}
      <View style={labelColumn ? styles.labelColumnBox : styles.labelBox}>
        <Text maxFontSizeMultiplier={FontScaleCap.control}
          numberOfLines={wrap || caption ? undefined : 1}
          style={[labelColumn ? styles.labelColumn : styles.labelText, { color: labelColumn ? colors.textSecondary : colors.text }]}
        >
          {label}
        </Text>
        {caption ? <Text maxFontSizeMultiplier={FontScaleCap.control} style={[styles.caption, { color: colors.textSecondary }]}>{caption}</Text> : null}
      </View>
      {value != null && (
        <Text maxFontSizeMultiplier={FontScaleCap.control} numberOfLines={1} style={[styles.value, { color: colors.textSecondary }]}>
          {value}
        </Text>
      )}
      {children != null && <View style={labelColumn ? styles.controlFill : undefined}>{children}</View>}
    </>
  );
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.row, (wrap || caption) && styles.tall, pressed && { backgroundColor: colors.backgroundElement }]}
      >
        {body}
      </Pressable>
    );
  }
  return <View style={[styles.row, (wrap || caption) && styles.tall]}>{body}</View>;
}

/** Rows on one panel with a hairline between each. */
export function RowGroup({ children }: { children: ReactNode }) {
  const { colors, skin } = useKit();
  const items = Children.toArray(children);
  return (
    <View
      style={[
        styles.group,
        { borderRadius: skin.radius.panel, borderColor: colors.hairline, backgroundColor: colors.background },
      ]}
    >
      {items.map((child, i) => (
        <Fragment key={i}>
          {i > 0 && <View style={[styles.hairline, { backgroundColor: colors.hairline }]} />}
          {child}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: RowSize.height,
    paddingHorizontal: RowSize.sidePad,
    flexDirection: 'row',
    alignItems: 'center',
    gap: RowSize.gap,
  },
  // A row with a caption or a wrapping label grows from 48 instead of cutting its text.
  tall: { height: undefined, minHeight: RowSize.height, paddingVertical: 10 },
  labelBox: { flex: 1, minWidth: 0, gap: 2 },
  labelColumnBox: { width: RowSize.labelWidth, flexShrink: 0, gap: 2 },
  labelText: { fontSize: TypeScale.control },
  labelColumn: { fontSize: TypeScale.meta },
  caption: { fontSize: TypeScale.meta },
  value: { fontSize: TypeScale.meta },
  controlFill: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  group: { borderWidth: 1, overflow: 'hidden' },
  hairline: { height: StyleSheet.hairlineWidth },
});
