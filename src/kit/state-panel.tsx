import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './button';
import { TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';

/**
 * One panel for every page that cannot show what was asked for (v0.14): not found, private,
 * signed out, failed, empty. Art, a title, the reason, a primary and a secondary way on, and a
 * hint line. It sits inside the page shell, so the rail and Back stay.
 *
 *   full     centred in the page, art above (a page that has nothing else to show)
 *   compact  a card with a small glyph on the left (a section of a page, or a strip of states)
 */
export interface StatePanelAction {
  label: string;
  onPress: () => void;
}

export function StatePanel({
  title,
  body,
  art,
  glyph,
  primary,
  secondary,
  hint,
  compact,
}: {
  title: string;
  body?: string;
  /** The picture above the title in the full panel (`PocketsArt`, a mascot). */
  art?: ReactNode;
  /** A one-character mark for the compact card. */
  glyph?: string;
  primary?: StatePanelAction;
  secondary?: StatePanelAction;
  /** A line under the buttons (a sign-in hint). Text or a node with its own link. */
  hint?: ReactNode;
  compact?: boolean;
}) {
  const { colors, skin } = useKit();
  const buttons =
    primary || secondary ? (
      <View style={[styles.buttons, compact && styles.buttonsCompact]}>
        {primary ? <Button look="primary" size={compact ? 'sm' : 'md'} label={primary.label} onPress={primary.onPress} /> : null}
        {secondary ? <Button size={compact ? 'sm' : 'md'} label={secondary.label} onPress={secondary.onPress} /> : null}
      </View>
    ) : null;
  const hintNode =
    hint == null ? null : typeof hint === 'string' ? (
      <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.hint, { color: colors.textSecondary }]}>{hint}</Text>
    ) : (
      hint
    );

  if (compact) {
    return (
      <View role="region" style={[styles.card, { backgroundColor: colors.backgroundElement, borderRadius: skin.radius.panel }]}>
        {glyph ? (
          <View style={[styles.glyphBox, { backgroundColor: colors.accentSoft, borderRadius: skin.radius.input }]} aria-hidden>
            <Text maxFontSizeMultiplier={FontScaleCap.control} style={[styles.glyph, { color: colors.link }]}>{glyph}</Text>
          </View>
        ) : null}
        <View style={styles.cardText}>
          <Text maxFontSizeMultiplier={FontScaleCap.reading} role="heading" style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
          {body ? <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.cardBody, { color: colors.textSecondary }]}>{body}</Text> : null}
          {buttons}
          {hintNode}
        </View>
      </View>
    );
  }
  return (
    <View role="region" style={styles.full}>
      {art ? <View style={styles.art}>{art}</View> : null}
      <Text maxFontSizeMultiplier={FontScaleCap.reading} role="heading" aria-level={1} style={[styles.title, { color: colors.text }]}>{title}</Text>
      {body ? <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.body, { color: colors.textSecondary }]}>{body}</Text> : null}
      {buttons}
      {hintNode}
    </View>
  );
}

/**
 * The empty binder page: a 3x3 of dashed pockets on a card, with an optional round badge
 * (a lock for private, ? for not found) at its lower right.
 */
export function PocketsArt({ badge, size = 128 }: { badge?: 'lock' | string | ReactNode; size?: number }) {
  const { colors, skin } = useKit();
  // Inner width less the two 6 gaps and each pocket's 1.5 border, so three always fit on a row.
  const pocket = Math.floor((size - 24 - 2 - 12) / 3) - 1;
  return (
    <View aria-hidden style={{ width: size + 16, height: size * 1.3 + 16 }}>
      <View style={[styles.page, { width: size, height: size * 1.3, backgroundColor: colors.background, borderColor: colors.hairline, borderRadius: skin.radius.panel }]}>
        {Array.from({ length: 9 }, (_, i) => (
          <View key={i} style={[styles.pocket, { width: pocket, height: Math.floor((size * 1.3 - 24 - 2 - 12) / 3) - 1, borderColor: colors.hairline, backgroundColor: colors.backgroundElement }]} />
        ))}
      </View>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: colors.accent, borderColor: colors.background }]}>
          {badge === 'lock' ? (
            <View style={styles.lock}>
              <View style={[styles.shackle, { borderColor: colors.accentText }]} />
              <View style={[styles.lockBody, { backgroundColor: colors.accentText }]} />
            </View>
          ) : typeof badge === 'string' ? (
            <Text maxFontSizeMultiplier={FontScaleCap.control} style={[styles.badgeGlyph, { color: colors.accentText }]}>{badge}</Text>
          ) : (
            badge
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  full: { alignItems: 'center', gap: 12, paddingVertical: 48, paddingHorizontal: 16, maxWidth: 560, alignSelf: 'center', width: '100%' },
  art: { marginBottom: 12 },
  title: { fontSize: TypeScale.h1 * 0.8, lineHeight: 36, fontWeight: '800', textAlign: 'center' },
  body: { fontSize: TypeScale.body, lineHeight: 25, textAlign: 'center', maxWidth: 460 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 12 },
  buttonsCompact: { justifyContent: 'flex-start', marginTop: 8, gap: 8 },
  hint: { fontSize: TypeScale.meta, lineHeight: 18, textAlign: 'center' },
  card: { flexDirection: 'row', gap: 12, padding: 14, flex: 1, minWidth: 260 },
  glyphBox: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: TypeScale.control, fontWeight: '700' },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { fontSize: TypeScale.control, lineHeight: 20, fontWeight: '700' },
  cardBody: { fontSize: TypeScale.meta, lineHeight: 18 },
  page: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: 12, borderWidth: 1 },
  pocket: { borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 4 },
  badge: { position: 'absolute', right: 0, bottom: 0, width: 40, height: 40, borderRadius: 20, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  badgeGlyph: { fontSize: TypeScale.control, fontWeight: '800' },
  lock: { alignItems: 'center' },
  shackle: { width: 10, height: 8, borderWidth: 2, borderBottomWidth: 0, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  lockBody: { width: 14, height: 10, borderRadius: 2 },
});
