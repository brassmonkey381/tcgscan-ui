import { Fragment, type ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Frame, TypeScale, useKit } from '../kit';

export interface RailItem {
  key: string;
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: ReactNode;
}

export interface RailGroup {
  /** Uppercase 10 px label. The first group may omit it. */
  label?: string;
  items: readonly RailItem[];
}

/**
 * The left rail: 216 wide, groups under a small-caps label with a hairline above every group but
 * the first, 32 px rows, a 3 px accent bar on the active row. The app supplies the groups and the
 * navigation (`onPress`); the rail never imports a router.
 */
export function Rail({ brand, groups, footer }: { brand?: ReactNode; groups: readonly RailGroup[]; footer?: ReactNode }) {
  const { colors } = useKit();
  return (
    <View
      accessibilityRole="menu"
      style={[styles.rail, { backgroundColor: colors.background, borderRightColor: colors.hairline }]}
    >
      {brand ? <View style={styles.brand}>{brand}</View> : null}
      <ScrollView contentContainerStyle={styles.groups}>
        <RailGroups groups={groups} />
      </ScrollView>
      {footer}
    </View>
  );
}

function RailGroups({ groups }: { groups: readonly RailGroup[] }) {
  const { colors } = useKit();
  return (
    <>
      {groups.map((g, i) => (
        <Fragment key={g.label ?? i}>
          {i > 0 && <View style={[styles.hairline, { backgroundColor: colors.hairline }]} />}
          <View style={styles.group}>
            {g.label ? (
              <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>{g.label}</Text>
            ) : null}
            {g.items.map((item) => (
              <RailRow key={item.key} item={item} />
            ))}
          </View>
        </Fragment>
      ))}
    </>
  );
}

function RailRow({ item }: { item: RailItem }) {
  const { colors, skin } = useKit();
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ selected: !!item.active }}
      onPress={item.onPress}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
        styles.row,
        { borderRadius: skin.radius.input },
        (item.active || hovered || pressed) && { backgroundColor: colors.backgroundElement },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: item.active ? colors.accent : 'transparent' }]} />
      {item.icon}
      <Text
        numberOfLines={1}
        style={[styles.rowLabel, { color: colors.text, fontWeight: item.active ? '700' : '500' }]}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

/** The phone form of the rail: the same groups in a drawer from the left edge. */
export function Drawer({
  visible,
  onClose,
  brand,
  groups,
}: {
  visible: boolean;
  onClose: () => void;
  brand?: ReactNode;
  groups: readonly RailGroup[];
}) {
  const { colors } = useKit();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.drawerRoot}>
        <View
          accessibilityViewIsModal
          style={[
            styles.drawer,
            { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          {brand ? <View style={styles.brand}>{brand}</View> : null}
          <ScrollView contentContainerStyle={styles.groups}>
            <RailGroups
              groups={groups.map((g) => ({
                ...g,
                items: g.items.map((it) => ({
                  ...it,
                  onPress: () => {
                    onClose();
                    it.onPress();
                  },
                })),
              }))}
            />
          </ScrollView>
        </View>
        <Pressable
          accessibilityLabel="Close menu"
          style={[styles.drawerScrim, { backgroundColor: colors.scrim55 }]}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
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
