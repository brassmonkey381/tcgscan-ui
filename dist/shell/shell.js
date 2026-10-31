import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Breakpoints } from 'tcgscan-theme';
import { Frame, Height, KitProvider, MinTouch, TypeScale, useKit, useWindowSize } from '../kit';
import { Header, HEADER_WIDTH } from './header';
import { Drawer, Rail } from './rail';
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
export function Shell({ header, nav, width, back, action, footer, tabBar, scroll = true, children, }) {
    const { colors, dark, skin } = useKit();
    const { width: window } = useWindowSize();
    const wide = window >= Breakpoints.rail;
    const [drawer, setDrawer] = useState(false);
    // The shell IS the page's top edge (no stack header above it), so it clears the status bar.
    const insets = useSafeAreaInsets();
    const maxWidth = Frame.width[width ?? (header ? HEADER_WIDTH[header.variant] : 'doc')];
    const gutter = wide ? Frame.gutter : Frame.gutterPhone;
    const band = !wide && skin.band ? skin.band : undefined;
    const top = (_jsxs(_Fragment, { children: [(back || action || (nav && !wide)) && (_jsxs(View, { style: styles.topRow, children: [nav && !wide ? (_jsx(Pressable, { accessibilityRole: "button", accessibilityLabel: "Open menu", onPress: () => setDrawer(true), style: styles.menuButton, children: _jsx(Text, { style: [styles.menuGlyph, { color: colors.text }], children: "\u2630" }) })) : null, back ? (_jsx(Pressable, { accessibilityRole: "link", onPress: back.onPress, hitSlop: 8, style: styles.back, children: _jsxs(Text, { style: [styles.backLabel, { color: colors.link }], children: ["\u2039 ", back.label] }) })) : null, action ? _jsx(View, { style: styles.action, children: action }) : null] })), header ? _jsx(Header, { ...header, compact: !wide }) : null] }));
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
                        paddingTop: gutter + insets.top,
                    },
                ], children: _jsx(KitProvider, { colors: { ...colors, ...band.colors }, dark: dark, skin: skin, children: top }) })) : (top), _jsx(View, { style: [styles.page, !scroll && styles.fixed], children: children }), footer] }));
    return (_jsxs(View, { style: [styles.root, { backgroundColor: colors.background }], children: [skin.ground ? (_jsx(View, { style: StyleSheet.absoluteFill, pointerEvents: "none", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: skin.ground })) : null, _jsxs(View, { style: styles.frame, children: [nav && wide ? _jsx(Rail, { brand: nav.brand, groups: nav.groups }) : null, scroll ? (_jsx(ScrollView, { style: styles.scroll, contentContainerStyle: styles.scrollContent, children: column })) : (_jsx(View, { style: [styles.scroll, styles.scrollContent], children: column }))] }), !wide ? tabBar : null, nav && !wide ? (_jsx(Drawer, { visible: drawer, onClose: () => setDrawer(false), brand: nav.brand, groups: nav.groups })) : null] }));
}
const styles = StyleSheet.create({
    root: { flex: 1 },
    frame: { flex: 1, flexDirection: 'row' },
    scroll: { flex: 1 },
    scrollContent: { flexGrow: 1, alignItems: 'center' },
    column: { width: '100%', flexGrow: 1, gap: 24 },
    band: { gap: 24, paddingBottom: 20 },
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
