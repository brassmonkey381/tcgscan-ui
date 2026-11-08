import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Breakpoints } from 'tcgscan-theme';
import { Frame, Height, KitProvider, MinTouch, TypeScale, useKit, useWindowSize } from '../kit';
import { Header, HeaderBelow, HEADER_WIDTH } from './header';
import { Drawer, Rail } from './rail';
import { FontScaleCap } from '../kit/scale';
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
export function Shell({ header, nav, width, back, action, footer, tabBar, scroll = true, ground, children, }) {
    const { colors, dark, skin } = useKit();
    const { width: window } = useWindowSize();
    const wide = window >= Breakpoints.rail;
    const [drawer, setDrawer] = useState(false);
    // The shell IS the page's top edge (no stack header above it), so it clears the status bar.
    const insets = useSafeAreaInsets();
    const maxWidth = Frame.width[width ?? (header ? HEADER_WIDTH[header.variant] : 'doc')];
    const gutter = wide ? Frame.gutter : Frame.gutterPhone;
    // The band draws at every width (owner's pick, 2026-11-02): on a desk it sits in the content
    // column, right of the rail, as wide as the column.
    const band = skin.band;
    // ONE LINE (owner, 2026-11-03): the menu or the way back, the title, the page's controls and the
    // shell's own action all share the header row, so every band is the same height. A phone shows
    // the back glyph alone; a desk has room for its label.
    const lead = nav && !wide ? (_jsx(Pressable, { role: "button", accessibilityLabel: "Open menu", onPress: () => setDrawer(true), style: styles.menuButton, children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.chrome, style: [styles.menuGlyph, { color: colors.text }], children: "\u2630" }) })) : back ? (_jsx(Pressable, { role: "link", accessibilityLabel: back.label, onPress: back.onPress, hitSlop: 8, 
        // Pressed feedback, as every link has (owner's pick).
        style: ({ pressed }) => [styles.back, !wide && styles.backPhone, pressed && styles.backPressed], children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.chrome, style: [styles.backLabel, !wide && styles.backGlyph, { color: colors.link }], children: wide ? `‹ ${back.label}` : '‹' }) })) : null;
    const top = header ? (_jsx(Header, { ...header, compact: !wide, lead: lead, trail: action ?? undefined })) : lead || action ? (_jsxs(View, { style: styles.topRow, children: [lead, action ? _jsx(View, { style: styles.action, children: action }) : null] })) : null;
    const below = header ? _jsx(HeaderBelow, { art: header.art, lede: header.lede, filters: header.filters }) : null;
    const column = (_jsxs(View, { style: [
            styles.column,
            !scroll && styles.fixed,
            { maxWidth, paddingHorizontal: gutter, paddingTop: gutter + insets.top, paddingBottom: gutter },
        ], children: [band ? (_jsx(View, { style: [
                    styles.band,
                    {
                        backgroundColor: band.fill,
                        borderBottomColor: band.lip,
                        borderBottomWidth: band.lipWidth,
                        borderBottomLeftRadius: band.radius,
                        borderBottomRightRadius: band.radius,
                        marginHorizontal: -gutter,
                        marginTop: -(gutter + insets.top),
                        paddingHorizontal: gutter,
                        // Snug: a short step above the one header line (owner, 2026-11-03).
                        paddingTop: (wide ? 14 : 6) + insets.top,
                    },
                ], children: _jsx(KitProvider, { colors: { ...colors, ...band.colors }, dark: dark, skin: skin, children: top }) })) : (top), below, _jsx(View, { style: [styles.page, !scroll && styles.fixed], children: children }), footer] }));
    return (_jsxs(View, { style: [styles.root, { backgroundColor: colors.background }], children: [(ground ?? skin.ground) ? (_jsx(View, { style: StyleSheet.absoluteFill, pointerEvents: "none", "aria-hidden": true, children: ground ?? skin.ground })) : null, _jsxs(View, { style: styles.frame, children: [nav && wide ? _jsx(Rail, { brand: nav.brand, groups: nav.groups }) : null, scroll ? (_jsx(ScrollView, { style: styles.scroll, contentContainerStyle: styles.scrollContent, children: column })) : (_jsx(View, { style: [styles.scroll, styles.scrollContent], children: column }))] }), !wide ? tabBar : null, nav && !wide ? (_jsx(Drawer, { visible: drawer, onClose: () => setDrawer(false), brand: nav.brand, groups: nav.groups })) : null] }));
}
const styles = StyleSheet.create({
    root: { flex: 1 },
    frame: { flex: 1, flexDirection: 'row' },
    scroll: { flex: 1 },
    scrollContent: { flexGrow: 1, alignItems: 'center' },
    column: { width: '100%', flexGrow: 1, gap: 16 },
    band: { paddingBottom: 10 },
    page: { flexGrow: 1, gap: 16 },
    // A route with its own scroller fills the column instead of growing past it.
    fixed: { flex: 1, minHeight: 0 },
    topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: Height.sm },
    menuButton: { width: MinTouch, height: MinTouch, alignItems: 'center', justifyContent: 'center', marginLeft: -12, marginRight: -8 },
    menuGlyph: { fontSize: TypeScale.h3 },
    back: { justifyContent: 'center', minHeight: Height.sm, minWidth: 24 },
    backPressed: { opacity: 0.6 },
    /** A phone shows the glyph alone: a full touch target, and a glyph that reads as one. */
    backPhone: { minWidth: MinTouch, minHeight: MinTouch, alignItems: 'center', marginLeft: -12, marginRight: -8 },
    backGlyph: { fontSize: TypeScale.h3 },
    action: { marginLeft: 'auto' },
    backLabel: { fontSize: TypeScale.control, fontWeight: '700' },
});
