import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, ChipGap, Frame, TypeScale, useKit, type FrameWidth } from '../kit';

/**
 * The three header shapes. A route picks one; nothing else about the header varies.
 *
 *   doc        eyebrow (the rail group), h1, one-line lede, hairline below.    How-to, Plans.
 *   hero       centred: accent eyebrow, h1 40, lede, primary + secondary.     Landing-ish pages.
 *   workbench  h1 + lede left, search + secondary + primary right, chips under. Browse, lists.
 *              `actions` (small controls sized by themselves) close the title line at every width.
 */
export type HeaderVariant = 'doc' | 'hero' | 'workbench';

/** The column width each header implies. The page never picks its own. */
export const HEADER_WIDTH: Record<HeaderVariant, FrameWidth> = {
  doc: 'doc',
  hero: 'doc',
  workbench: 'wide',
};

export interface HeaderAction {
  label: string;
  onPress: () => void;
  /** A destructive page action (delete this collection): the danger tone, never the primary look. */
  tone?: 'danger';
}

export interface HeaderProps {
  variant: HeaderVariant;
  title: string;
  eyebrow?: string;
  lede?: string;
  /** hero: the primary + secondary pair. workbench: the same pair, right of the search. */
  primary?: HeaderAction;
  secondary?: HeaderAction;
  /** workbench: the search input, placed right of the title. */
  tools?: ReactNode;
  /**
   * workbench: small controls that size themselves (a view toggle, a ••• menu). They stay on the
   * title line on a phone too, where `tools` and the buttons drop under it.
   */
  actions?: ReactNode;
  /** workbench: the chip row under the title line. */
  filters?: ReactNode;
  /** hero: a brand mark drawn in place of the h1 (the title still names the page). */
  mark?: ReactNode;
  /** hero: an illustration above the eyebrow, with the h1 still drawn under it. */
  art?: ReactNode;
  /** Phone layout: tools stack under the title, the hero h1 drops to 28. */
  compact?: boolean;
}

export function Header(props: HeaderProps) {
  if (props.variant === 'hero') return <HeroHeader {...props} />;
  if (props.variant === 'workbench') return <WorkbenchHeader {...props} />;
  return <DocHeader {...props} />;
}

function Title({ children, size, centred }: { children: string; size: number; centred?: boolean }) {
  const { colors, skin } = useKit();
  const ink = skin.ink;
  // A skin's title size stands in for the scale's h1 (the hero's 40 keeps its own size).
  const px = ink?.titleSize && size === TypeScale.h1 ? ink.titleSize : size;
  return (
    <Text
      accessibilityRole="header"
      style={[
        { fontSize: px, lineHeight: Math.round(px * 1.15), fontWeight: '800', color: ink?.title ?? colors.text },
        // The title's lip: a hard shadow straight down, the buttons' hardware edge in type.
        ink?.titleLip ? { textShadowColor: ink.titleLip, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0 } : null,
        centred && styles.titleCentred,
        skin.displayFace?.(800),
      ]}
      {...skin.displayProps}
    >
      {children}
    </Text>
  );
}

function Eyebrow({ children, accent }: { children: string; accent?: boolean }) {
  const { colors, skin } = useKit();
  return (
    <Text style={[styles.eyebrow, { color: accent ? colors.link : (skin.ink?.label ?? colors.textSecondary) }]}>{children}</Text>
  );
}

function Lede({ children, centred }: { children: string; centred?: boolean }) {
  const { colors } = useKit();
  return (
    <Text style={[styles.lede, { color: colors.textSecondary }, centred && styles.ledeCentred]}>
      {children}
    </Text>
  );
}

function DocHeader({ title, eyebrow, lede }: HeaderProps) {
  const { colors } = useKit();
  return (
    <View style={[styles.doc, { borderBottomColor: colors.hairline }]}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title size={TypeScale.h1}>{title}</Title>
      {lede ? <Lede>{lede}</Lede> : null}
    </View>
  );
}

function HeroHeader({ title, eyebrow, lede, primary, secondary, mark, art, compact }: HeaderProps) {
  return (
    <View style={styles.hero}>
      {art ? <View style={styles.heroTitle}>{art}</View> : null}
      {eyebrow ? <Eyebrow accent>{eyebrow}</Eyebrow> : null}
      <View style={styles.heroTitle}>
        {mark ?? (
          <Title size={compact ? TypeScale.h1 : TypeScale.hero} centred>
            {title}
          </Title>
        )}
      </View>
      {lede ? <Lede centred>{lede}</Lede> : null}
      {(primary || secondary) && (
        <View style={styles.heroActions}>
          {primary && <Button look="primary" size="lg" {...primary} />}
          {secondary && <Button look="secondary" size="lg" {...secondary} />}
        </View>
      )}
    </View>
  );
}

function WorkbenchHeader({ title, lede, primary, secondary, tools, actions, filters, compact }: HeaderProps) {
  const titleBlock = (
    <View style={styles.workbenchTitle}>
      <Title size={TypeScale.h1}>{title}</Title>
      {lede ? <Lede>{lede}</Lede> : null}
    </View>
  );
  const inline = actions && compact;
  return (
    <View style={styles.workbench}>
      <View style={[styles.workbenchLine, compact && styles.workbenchLineCompact]}>
        {inline ? (
          // The lede goes under the line, not beside the actions, where a phone wraps it to a sliver.
          <View style={styles.workbenchTitle}>
            <View style={styles.workbenchTitleLine}>
              <View style={styles.workbenchTitle}>
                <Title size={TypeScale.h1}>{title}</Title>
              </View>
              {actions}
            </View>
            {lede ? <Lede>{lede}</Lede> : null}
          </View>
        ) : (
          titleBlock
        )}
        {(tools || primary || secondary || (actions && !compact)) && (
          <View style={[styles.workbenchTools, compact && styles.workbenchToolsCompact]}>
            {tools ? <View style={compact ? styles.toolFill : styles.toolFixed}>{tools}</View> : null}
            {secondary && <Button look="secondary" {...secondary} />}
            {primary && <Button look="primary" {...primary} />}
            {compact ? null : actions}
          </View>
        )}
      </View>
      {filters}
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: Frame.railGroupLabel,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  lede: { fontSize: TypeScale.body, lineHeight: 25, maxWidth: 640 },
  ledeCentred: { textAlign: 'center', maxWidth: 520 },
  // A hero h1 that wraps stays centred line by line, not just as a block.
  titleCentred: { textAlign: 'center' },
  doc: { gap: 8, paddingBottom: 24, borderBottomWidth: StyleSheet.hairlineWidth },
  hero: { alignItems: 'center', gap: 12, paddingVertical: 16 },
  heroTitle: { alignItems: 'center' },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 8 },
  workbench: { gap: 16 },
  workbenchLine: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 },
  workbenchLineCompact: { flexDirection: 'column', alignItems: 'stretch' },
  workbenchTitle: { flexShrink: 1, gap: 4 },
  workbenchTitleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  workbenchTools: { flexDirection: 'row', alignItems: 'center', gap: ChipGap },
  workbenchToolsCompact: { alignSelf: 'stretch' },
  toolFixed: { width: 320 },
  toolFill: { flex: 1 },
});
