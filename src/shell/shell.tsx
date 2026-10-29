import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Breakpoints } from 'tcgscan-theme';

import { Frame, Height, MinTouch, TypeScale, useKit, useWindowSize, type FrameWidth } from '../kit';
import { Header, HEADER_WIDTH, type HeaderProps } from './header';
import { Drawer, Rail, type RailGroup } from './rail';

export interface ShellNav {
  brand?: ReactNode;
  groups: readonly RailGroup[];
}

/**
 * The page frame, one per route:
 *
 *   [rail 216] [ content column: back row · header · page · footer ]   (desktop, >= 900)
 *   [ menu row · header · page · footer ] [tab bar slot]               (phone, gutter 16)
 *
 * The header variant picks the column width (doc/hero 960, workbench 1440); `width` overrides it
 * only for prose (800). The rail is optional: without `nav` the shell is just the column, which is
 * how it ships first, under today's tab bar. `tabBar` is a slot so the tab bar can move into the
 * shell later without changing any route.
 */
export function Shell({
  header,
  nav,
  width,
  back,
  action,
  footer,
  tabBar,
  scroll = true,
  children,
}: {
  header?: Omit<HeaderProps, 'compact'>;
  nav?: ShellNav;
  width?: FrameWidth;
  back?: { label: string; onPress: () => void };
  /** One control at the right end of the top row (an account button). */
  action?: ReactNode;
  footer?: ReactNode;
  tabBar?: ReactNode;
  /** Off for a route that owns its own scroller (a virtualized grid). */
  scroll?: boolean;
  children: ReactNode;
}) {
  const { colors } = useKit();
  const { width: window } = useWindowSize();
  const wide = window >= Breakpoints.rail;
  const [drawer, setDrawer] = useState(false);
  // The shell IS the page's top edge (no stack header above it), so it clears the status bar.
  const insets = useSafeAreaInsets();

  const maxWidth = Frame.width[width ?? (header ? HEADER_WIDTH[header.variant] : 'doc')];
  const gutter = wide ? Frame.gutter : Frame.gutterPhone;

  const column = (
    <View
      style={[
        styles.column,
        !scroll && styles.fixed,
        { maxWidth, paddingHorizontal: gutter, paddingTop: gutter + insets.top, paddingBottom: gutter },
      ]}
    >
      {(back || action || (nav && !wide)) && (
        <View style={styles.topRow}>
          {nav && !wide ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              onPress={() => setDrawer(true)}
              style={styles.menuButton}
            >
              <Text style={[styles.menuGlyph, { color: colors.text }]}>☰</Text>
            </Pressable>
          ) : null}
          {back ? (
            <Pressable accessibilityRole="link" onPress={back.onPress} hitSlop={8} style={styles.back}>
              <Text style={[styles.backLabel, { color: colors.link }]}>‹ {back.label}</Text>
            </Pressable>
          ) : null}
          {action ? <View style={styles.action}>{action}</View> : null}
        </View>
      )}
      {header ? <Header {...header} compact={!wide} /> : null}
      <View style={[styles.page, !scroll && styles.fixed]}>{children}</View>
      {footer}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.frame}>
        {nav && wide ? <Rail brand={nav.brand} groups={nav.groups} /> : null}
        {scroll ? (
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {column}
          </ScrollView>
        ) : (
          <View style={[styles.scroll, styles.scrollContent]}>{column}</View>
        )}
      </View>
      {!wide ? tabBar : null}
      {nav && !wide ? (
        <Drawer visible={drawer} onClose={() => setDrawer(false)} brand={nav.brand} groups={nav.groups} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  frame: { flex: 1, flexDirection: 'row' },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center' },
  column: { width: '100%', flexGrow: 1, gap: 24 },
  page: { flexGrow: 1, gap: 16 },
  // A route with its own scroller fills the column instead of growing past it.
  fixed: { flex: 1, minHeight: 0 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: Height.sm, marginBottom: -8 },
  menuButton: { width: MinTouch, height: MinTouch, alignItems: 'center', justifyContent: 'center', marginLeft: -12 },
  menuGlyph: { fontSize: TypeScale.h3 },
  back: { justifyContent: 'center', minHeight: Height.sm },
  action: { marginLeft: 'auto' },
  backLabel: { fontSize: TypeScale.meta, fontWeight: '600' },
});
