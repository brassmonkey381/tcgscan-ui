import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TypeScale, useKit } from '../kit';

/** Reading measure inside the 960 doc column, so a guide reads like a page. */
export const DOC_MEASURE = 680;

/** A section of a doc page: a 17 heading and its paragraphs, 8 apart. */
export function DocSection({ heading, children }: { heading?: string; children: ReactNode }) {
  const { colors } = useKit();
  return (
    <View style={styles.section}>
      {heading ? (
        <Text accessibilityRole="header" style={[styles.heading, { color: colors.text }]}>
          {heading}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

/** Body copy at 16 on 24, in the secondary ink, held to the reading measure. */
export function DocText({ children, tone = 'secondary' }: { children: ReactNode; tone?: 'primary' | 'secondary' | 'meta' }) {
  const { colors } = useKit();
  return (
    <Text
      style={[
        tone === 'meta' ? styles.meta : styles.text,
        { color: tone === 'primary' ? colors.text : colors.textSecondary },
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8, maxWidth: DOC_MEASURE },
  heading: { fontSize: TypeScale.sheetTitle, lineHeight: 22, fontWeight: '700' },
  text: { fontSize: TypeScale.body, lineHeight: 24 },
  meta: { fontSize: TypeScale.meta, lineHeight: 18 },
});
