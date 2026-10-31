import { type ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { type Palette } from 'tcgscan-theme';
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
    /**
     * A texture drawn behind every page, filling the shell (a dot grid, a pattern). Decorative: the
     * shell hides it from readers and touches. Omit for a flat `background`.
     */
    ground?: ReactNode;
    /**
     * A coloured band behind the top row and header on a phone, full bleed, with a lip under it.
     * `colors` overrides the palette inside the band so text and controls stay legible on its fill
     * (BiBo: navy ink and navy buttons on yellow). Omit for no band.
     */
    band?: BandSkin;
    /** Text colours by role, where a skin wants them apart from the palette (BiBo: amber titles). */
    ink?: InkSkin;
    /**
     * The hardware lip under every button and chip: a solid edge `depth` points tall that the
     * control sinks onto when pressed. Omit for flat controls.
     */
    lip?: LipSkin;
    /** A screen-style text input (BiBo: navy, cyan pixel text, a sideways-scrolling placeholder). */
    input?: InputSkin;
    /**
     * Pop-ups (Sheet, Dialog, PopupSurface) drawn as their own surface: `colors` override the palette
     * inside them (BiBo: a navy screen, light ink, cyan links), `edge` is a band along the top edge.
     */
    popup?: PopupSkin;
    /** Checkbox colours: the checked fill and its tick (BiBo: navy with a glowing cyan tick). */
    check?: {
        fill: string;
        tick: string;
        glow?: boolean;
    };
    /** The loading pixels' colour (BiBo: deep cyan on light grounds). */
    loading?: {
        color: string;
    };
    /** A plain text field (names, notes), apart from the search screen (BiBo: white, navy edge). */
    field?: {
        fill: string;
        border: string;
        borderWidth: number;
        text: string;
    };
    /**
     * The on/off switch (BiBo: ON / OFF written in the track, a navy track on and grey off, a yellow
     * knob on a lip). `face` is the font for the written state.
     */
    switch?: {
        onTrack: string;
        offTrack: string;
        knob: string;
        knobEdge?: string;
        knobLip?: string;
        onText: string;
        offText: string;
        face?: TextStyle;
    };
}
export interface PopupSkin {
    colors: Partial<Palette>;
    edge?: string;
    edgeWidth?: number;
    /** The pop-up title's colour, and whether it glows (BiBo: cyan on navy). */
    title?: string;
    titleGlow?: boolean;
}
export interface InkSkin {
    /** Page titles, and the lip (a hard text shadow under the letters). */
    title?: string;
    titleLip?: string;
    /** Page title size in points, replacing the scale's h1 where set. */
    titleSize?: number;
    /** Section headings. */
    heading?: string;
    /** Small caps labels (eyebrows). */
    label?: string;
    /** Underline every link-styled control (quiet buttons). */
    linkUnderline?: boolean;
}
export interface LipSkin {
    depth: number;
    /** Under the primary look and a selected chip. */
    primary: string;
    /** Under every other look and an unselected chip. */
    secondary: string;
}
export interface InputSkin {
    fill: string;
    text: string;
    placeholder: string;
    /** The face for typed text and the placeholder (the app's pixel face). */
    face?: TextStyle;
    /** Scroll a placeholder sideways, like a ticker on a screen. */
    marquee?: boolean;
}
export interface BandSkin {
    fill: string;
    /** The lip under the band (a darker step of the fill), `lipWidth` points tall. */
    lip: string;
    lipWidth: number;
    /** Bottom corners. */
    radius: number;
    colors: Partial<Palette>;
}
/** Today's TCGScan skin: tcgscan-theme's radius tokens, one radius per role. */
export declare const tcgscanSkin: KitSkin;
/** The fixed dark glass toasts sit on; scheme-independent by design. */
export declare const KitChrome: {
    readonly deepest: "#000000";
    readonly deep: "#0C0C0C";
    readonly base: "#16181C";
    readonly toast: "#1C1F24F7";
    readonly toastBorder: "#FFFFFF22";
    readonly text: "#FFFFFF";
    readonly textSecondary: "#A8ADB8";
    readonly accent: "#2F6FED";
    readonly accentText: "#FFFFFF";
    readonly link: "#8AB4FF";
    readonly success: "#4ED18C";
};
export interface KitValue {
    colors: Palette;
    dark: boolean;
    skin: KitSkin;
}
export declare function KitProvider({ colors, dark, skin, children, }: {
    colors: Palette;
    dark: boolean;
    skin?: KitSkin;
    children: ReactNode;
}): import("react").JSX.Element;
/** The palette and skin for kit components. Outside a provider it falls back to light TCGScan. */
export declare function useKit(): KitValue;
