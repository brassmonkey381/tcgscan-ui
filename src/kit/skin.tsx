import { createContext, useContext, type ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Chrome, Colors, Radius, type Palette } from 'tcgscan-theme';

/**
 * What each app owns in the shared shell: colours, faces, a radius per role and the one allowed
 * shadow. Sizes are NOT here; they come from `scale.ts` and are the same in every skin.
 *
 * The kit never imports the app. The app wraps its tree in `<KitProvider>` with its live palette
 * (from its own theme store) and its skin; every kit component reads both through `useKit()`.
 * That is what lets this folder move into a shared package later: michi-maker supplies its own
 * palette and skin through the same door.
 */
export interface KitSkin {
  radius: {
    button: number;
    chip: number;
    input: number;
    panel: number;
    sheet: number;
    dialog: number;
    toast: number;
  };
  /**
   * The display face for headings, as a style appended after the size/weight. Returns undefined
   * when the face is not loaded, leaving the OS face in place.
   */
  displayFace?: (weight: 600 | 700 | 800) => TextStyle | undefined;
  /** Props spread on a heading `<Text>` to request the display face (web `data-face`). */
  displayProps?: object;
  /** The skin's one allowed shadow, under the primary button only. None in today's TCGScan skin. */
  primaryShadow?: ViewStyle;
}

/** Today's TCGScan skin: tcgscan-theme's radius tokens, one radius per role. */
export const tcgscanSkin: KitSkin = {
  radius: {
    button: Radius.pill,
    chip: Radius.pill,
    input: Radius.control,
    panel: Radius.panel,
    sheet: Radius.sheet,
    dialog: Radius.lg,
    toast: Radius.panel,
  },
};

/** The fixed dark glass toasts sit on; scheme-independent by design. */
export const KitChrome = Chrome;

export interface KitValue {
  colors: Palette;
  dark: boolean;
  skin: KitSkin;
}

const KitContext = createContext<KitValue | null>(null);

export function KitProvider({
  colors,
  dark,
  skin = tcgscanSkin,
  children,
}: {
  colors: Palette;
  dark: boolean;
  skin?: KitSkin;
  children: ReactNode;
}) {
  return <KitContext.Provider value={{ colors, dark, skin }}>{children}</KitContext.Provider>;
}

const FALLBACK: KitValue = { colors: Colors.light, dark: false, skin: tcgscanSkin };

/** The palette and skin for kit components. Outside a provider it falls back to light TCGScan. */
export function useKit(): KitValue {
  return useContext(KitContext) ?? FALLBACK;
}
