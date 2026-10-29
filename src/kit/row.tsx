import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RowSize, TypeScale } from './scale';
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
}: {
  label: string;
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
      <Text
        numberOfLines={1}
        style={[
          labelColumn ? styles.labelColumn : styles.label,
          { color: labelColumn ? colors.textSecondary : colors.text },
        ]}
      >
        {label}
      </Text>
      {value != null && (
        <Text numberOfLines={1} style={[styles.value, { color: colors.textSecondary }]}>
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
        style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.backgroundElement }]}
      >
        {body}
      </Pressable>
    );
  }
  return <View style={styles.row}>{body}</View>;
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
  label: { flex: 1, fontSize: TypeScale.control },
  labelColumn: { width: RowSize.labelWidth, flexShrink: 0, fontSize: TypeScale.meta },
  value: { fontSize: TypeScale.meta },
  controlFill: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  group: { borderWidth: 1, overflow: 'hidden' },
  hairline: { height: StyleSheet.hairlineWidth },
});
