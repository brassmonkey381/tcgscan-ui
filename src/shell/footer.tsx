import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TypeScale, useKit } from '../kit';

export interface FooterLink {
  label: string;
  onPress: () => void;
}

/** The footer slot at the bottom of the content column: the same links on every page. */
export function Footer({ links, note }: { links: readonly FooterLink[]; note?: string }) {
  const { colors } = useKit();
  return (
    <View style={[styles.footer, { borderTopColor: colors.hairline }]}>
      <View style={styles.links}>
        {links.map((l) => (
          <Pressable key={l.label} accessibilityRole="link" onPress={l.onPress} hitSlop={8}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>{l.label}</Text>
          </Pressable>
        ))}
      </View>
      {note ? <Text style={[styles.link, { color: colors.textSecondary }]}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 48,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  // Shrinkable, or the row sizes to one line of links and its own wrap never gets a width to
  // wrap at: on a phone the last link ran off the edge.
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, flexShrink: 1, minWidth: 0 },
  link: { fontSize: TypeScale.meta },
});
