import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Frame, TypeScale, useKit, type FrameWidth } from '../kit';
import { FontScaleCap } from '../kit/scale';

/**
 * ONE HEADER LINE, THE SAME HEIGHT ON EVERY PAGE (owner, 2026-11-03: "all header sections the same
 * height", "fit a bit snugger"). Whatever the variant, the band holds one row: the way back, the
 * title (or a brand mark), and the page's own controls at the right, which shrink before the row
 * ever wraps. Anything that is not the title line (a lede, filter chips, a hero illustration) is
 * drawn by the Shell under the band, as the top of the page.
 *
 *   doc        the title alone (How-to, Settings, legal).
 *   hero       a brand mark in place of the title (Home).
 *   workbench  the title with tools, buttons and actions at the right (Browse, lists).
 *
 * `eyebrow` is accepted and no longer drawn: the rail and the tab bar already say where a page is.
 */
export type HeaderVariant = 'doc' | 'hero' | 'workbench';

/** The column width each header implies. The page never picks its own. */
export const HEADER_WIDTH: Record<HeaderVariant, FrameWidth> = {
  doc: 'doc',
  hero: 'doc',
  workbench: 'wide',
};

/** The one header line height: a 44 control, or a 30pt title, with room to breathe. */
export const HEADER_LINE = 48;

export interface HeaderAction {
  label: string;
  onPress: () => void;
  /** A destructive page action (delete this collection): the danger tone, never the primary look. */
  tone?: 'danger';
}

export interface HeaderProps {
  variant: HeaderVariant;
  title: string;
  /** Not drawn any more (see above); kept so existing callers still compile. */
  eyebrow?: string;
  /** Drawn by the Shell under the band, as the page's first line. */
  lede?: string;
  /** The page's buttons, at the right of the title line. */
  primary?: HeaderAction;
  secondary?: HeaderAction;
  /** Controls at the right of the title line (a search, a switch, a picker). They shrink first. */
  tools?: ReactNode;
  /** Small controls that size themselves (a view toggle, a ••• menu), last on the line. */
  actions?: ReactNode;
  /** Drawn by the Shell under the band (a chip row). */
  filters?: ReactNode;
  /** hero: a brand mark drawn in place of the title (the title still names the page). */
  mark?: ReactNode;
  /** Drawn by the Shell under the band, above the lede. */
  art?: ReactNode;
  /** Phone layout: a smaller title and small buttons. */
  compact?: boolean;
  /** Set by the Shell: the way back (or the menu) before the title, and its own control after. */
  lead?: ReactNode;
  trail?: ReactNode;
}

export function Header({ variant, title, primary, secondary, tools, actions, mark, compact, lead, trail }: HeaderProps) {
  const { colors, skin } = useKit();
  const ink = skin.ink;
  const px = compact ? TITLE.compact : TITLE.wide;
  const size = compact ? 'sm' : 'md';
  return (
    <View style={styles.line}>
      {lead}
      <View style={styles.title}>
        {variant === 'hero' && mark ? (
          mark
        ) : (
          <Text
            maxFontSizeMultiplier={FontScaleCap.control}
            role="heading"
            numberOfLines={1}
            style={[
              { fontSize: px, lineHeight: Math.round(px * 1.15), fontWeight: '800', color: ink?.title ?? colors.text },
              // The title's lip: a hard shadow straight down, the buttons' hardware edge in type.
              ink?.titleLip ? { textShadowColor: ink.titleLip, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0 } : null,
              skin.displayFace?.(800),
            ]}
            {...skin.displayProps}
          >
            {title}
          </Text>
        )}
      </View>
      {tools || primary || secondary || actions || trail ? (
        <View style={styles.right}>
          {tools ? <View style={styles.tools}>{tools}</View> : null}
          {secondary ? <Button look="secondary" size={size} {...secondary} /> : null}
          {primary ? <Button look="primary" size={size} {...primary} /> : null}
          {actions}
          {trail}
        </View>
      ) : null}
    </View>
  );
}

/** The title on one line: smaller on a phone, so the controls beside it keep their room. */
const TITLE = { compact: 24, wide: 30 } as const;

/** What the Shell draws under the band for a header: art, lede, filters. Null when there is none. */
export function HeaderBelow({ art, lede, filters }: Pick<HeaderProps, 'art' | 'lede' | 'filters'>) {
  const { colors } = useKit();
  if (!art && !lede && !filters) return null;
  return (
    <View style={styles.below}>
      {art ? <View style={styles.art}>{art}</View> : null}
      {lede ? (
        <Text maxFontSizeMultiplier={FontScaleCap.reading} style={[styles.lede, { color: colors.textSecondary }]}>
          {lede}
        </Text>
      ) : null}
      {filters}
    </View>
  );
}

const styles = StyleSheet.create({
  line: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: HEADER_LINE },
  title: { flexShrink: 1, flexGrow: 1, minWidth: 0, justifyContent: 'center' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1, minWidth: 0 },
  tools: { flexShrink: 1, minWidth: 0 },
  below: { gap: 8 },
  art: { alignItems: 'center' },
  lede: { fontSize: TypeScale.body, lineHeight: 24, maxWidth: Frame.width.prose },
});
