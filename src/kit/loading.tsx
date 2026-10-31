import { StyleSheet, Text, View } from 'react-native';

import { LoadingDots } from './lip';
import { TypeScale } from './scale';
import { useKit } from './skin';

/**
 * The one loading indicator: three pixels stepping left to right in the skin's loading colour
 * (BiBo: deep cyan), with an optional line of text beside them. Replaces spinners.
 */
export function Loading({ label, size = 7 }: { label?: string; size?: number }) {
  const { colors, skin } = useKit();
  return (
    <View style={styles.row} accessibilityRole="progressbar" accessibilityLabel={label ?? 'Loading'}>
      <LoadingDots color={skin.loading?.color ?? colors.link} size={size} />
      {label ? <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: TypeScale.meta },
});
