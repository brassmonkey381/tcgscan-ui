import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Frame, TypeScale, useKit } from '../kit';
/**
 * The left rail: 216 wide, groups under a small-caps label with a hairline above every group but
 * the first, 32 px rows, a 3 px accent bar on the active row. The app supplies the groups and the
 * navigation (`onPress`); the rail never imports a router.
 */
export function Rail({ brand, groups, footer }) {
    const { colors } = useKit();
    return (_jsxs(View, { accessibilityRole: "menu", style: [styles.rail, { backgroundColor: colors.background, borderRightColor: colors.hairline }], children: [brand ? _jsx(View, { style: styles.brand, children: brand }) : null, _jsx(ScrollView, { contentContainerStyle: styles.groups, children: _jsx(RailGroups, { groups: groups }) }), footer] }));
}
function RailGroups({ groups }) {
    const { colors } = useKit();
    return (_jsx(_Fragment, { children: groups.map((g, i) => (_jsxs(Fragment, { children: [i > 0 && _jsx(View, { style: [styles.hairline, { backgroundColor: colors.hairline }] }), _jsxs(View, { style: styles.group, children: [g.label ? (_jsx(Text, { style: [styles.groupLabel, { color: colors.textSecondary }], children: g.label })) : null, g.items.map((item) => (_jsx(RailRow, { item: item }, item.key)))] })] }, g.label ?? i))) }));
}
function RailRow({ item }) {
    const { colors, skin } = useKit();
    return (_jsxs(Pressable, { accessibilityRole: "menuitem", accessibilityState: { selected: !!item.active }, onPress: item.onPress, style: ({ pressed, hovered }) => [
            styles.row,
            { borderRadius: skin.radius.input },
            (item.active || hovered || pressed) && { backgroundColor: colors.backgroundElement },
        ], children: [_jsx(View, { style: [styles.bar, { backgroundColor: item.active ? colors.accent : 'transparent' }] }), item.icon, _jsx(Text, { numberOfLines: 1, style: [styles.rowLabel, { color: colors.text, fontWeight: item.active ? '700' : '500' }], children: item.label })] }));
}
/** The phone form of the rail: the same groups in a drawer from the left edge. */
export function Drawer({ visible, onClose, brand, groups, }) {
    const { colors } = useKit();
    const insets = useSafeAreaInsets();
    return (_jsx(Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onClose, children: _jsxs(View, { style: styles.drawerRoot, children: [_jsxs(View, { accessibilityViewIsModal: true, style: [
                        styles.drawer,
                        { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom },
                    ], children: [brand ? _jsx(View, { style: styles.brand, children: brand }) : null, _jsx(ScrollView, { contentContainerStyle: styles.groups, children: _jsx(RailGroups, { groups: groups.map((g) => ({
                                    ...g,
                                    items: g.items.map((it) => ({
                                        ...it,
                                        onPress: () => {
                                            onClose();
                                            it.onPress();
                                        },
                                    })),
                                })) }) })] }), _jsx(Pressable, { accessibilityLabel: "Close menu", style: [styles.drawerScrim, { backgroundColor: colors.scrim55 }], onPress: onClose })] }) }));
}
const styles = StyleSheet.create({
    rail: {
        width: Frame.railWidth,
        flexShrink: 0,
        paddingVertical: Frame.railPadV,
        paddingHorizontal: Frame.railPadH,
        borderRightWidth: StyleSheet.hairlineWidth,
        gap: 16,
    },
    brand: { paddingHorizontal: 8, paddingBottom: 8 },
    groups: { gap: 12 },
    group: { gap: 1 },
    hairline: { height: StyleSheet.hairlineWidth },
    groupLabel: {
        fontSize: Frame.railGroupLabel,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        paddingHorizontal: 10,
        paddingBottom: 4,
    },
    row: {
        height: Frame.railRow,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingRight: 10,
        overflow: 'hidden',
    },
    bar: { width: Frame.railActiveBar, alignSelf: 'stretch', marginRight: 4 },
    rowLabel: { flex: 1, fontSize: TypeScale.meta },
    drawerRoot: { flex: 1, flexDirection: 'row' },
    drawer: { width: Frame.railWidth + 48, paddingHorizontal: Frame.railPadH, gap: 16 },
    drawerScrim: { flex: 1 },
});
