import { type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import type { Palette } from 'tcgscan-theme';

import { KitProvider, useKit, type KitValue } from './skin';

/** A soft halo for a title that glows on a dark pop-up. */
export const GLOW = { textShadowColor: 'rgba(63,216,255,0.8)', textShadowRadius: 10, textShadowOffset: { width: 0, height: 0 } } as const;

/** The palette a pop-up draws with: the skin's popup colours over the page's, or the page's. */
export function popupColors({ colors, skin }: KitValue): Palette {
  return skin.popup ? ({ ...colors, ...skin.popup.colors } as Palette) : colors;
}

/**
 * A pop-up's panel, for a host that builds its own modal: the skin's popup surface (fill, the edge
 * band along the top) with every kit control inside drawing in the popup palette. Sheet and Dialog
 * use the same colours, so a hand-built pop-up and a kit one look alike.
 */
export function PopupSurface({
  children,
  style,
  edge = true,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Draw the skin's top edge band (off for a pop-up whose top is not its own edge). */
  edge?: boolean;
}) {
  const kit = useKit();
  const pc = popupColors(kit);
  const band = edge && kit.skin.popup?.edge;
  return (
    <View
      style={[
        { backgroundColor: pc.background },
        band ? { borderTopWidth: kit.skin.popup?.edgeWidth ?? 5, borderTopColor: kit.skin.popup!.edge } : null,
        style,
      ]}
    >
      <KitProvider colors={pc} dark={kit.skin.popup ? true : kit.dark} skin={kit.skin}>
        {children}
      </KitProvider>
    </View>
  );
}
