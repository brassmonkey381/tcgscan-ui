/**
 * The one central scale for the page shell and its control kit, shared by tcgscan-app and (later)
 * michi-maker. Owner's decision 2026-10-28: every control in both apps is sized from these numbers
 * and nothing in between. Colours, faces, radius per role and the one allowed shadow are the SKIN's
 * business (`skin.ts`); sizes are not.
 *
 * Import-free on purpose, like tcgscan-theme's `tokens.ts`: this folder is meant to be lifted into
 * a shared package once it settles, so nothing here may reach into the app.
 *
 * Source: docs/PAGE-SHELL-HANDOFF.md at the workspace root, and the approved Design canvas boards.
 */
/** Control heights. Small inside rows and bars, medium in sheets and forms, large for the one
 *  action a page is for. */
export declare const Height: {
    readonly sm: 36;
    readonly md: 44;
    readonly lg: 52;
};
export type ControlSize = keyof typeof Height;
/** Horizontal padding and label size per control height. */
export declare const ControlPad: {
    readonly sm: 12;
    readonly md: 16;
    readonly lg: 20;
};
/**
 * The type scale: one ladder, 13 / 15 / 17 / 22 / 36 (owner's round 3 pick, 2026-10-31, "Roomy"):
 * caption, small, body, heading, title. Nothing draws text at any other size.
 */
export declare const TypeScale: {
    readonly meta: 13;
    readonly control: 15;
    readonly body: 17;
    readonly sheetTitle: 22;
    readonly h3: 22;
    readonly h1: 36;
    readonly hero: 36;
};
/** Label size per control height: 13 on small, 15 on medium and large. */
export declare const ControlText: {
    readonly sm: 13;
    readonly md: 15;
    readonly lg: 15;
};
/** Segment groups: the inner pad, so each option sits `Height[size] - 2 * pad` tall. */
export declare const SegPad = 2;
/** Settings / inspector rows. */
export declare const RowSize: {
    readonly height: 48;
    readonly labelWidth: 96;
    readonly sidePad: 16;
    readonly gap: 12;
};
/** Bottom sheets and dialogs. Buttons in the button row are equal width, 12 apart. */
export declare const SheetSize: {
    readonly titleRow: 56;
    readonly buttonRow: 72;
    readonly sidePad: 20;
    readonly bodyPad: 20;
    readonly buttonGap: 12;
    readonly maxWidth: 560;
    readonly dialogMaxWidth: 400;
    readonly dialogPad: 24;
};
/** Toast: one line, one action, 16 above the bottom edge on phones. */
export declare const ToastSize: {
    readonly height: 48;
    readonly sidePad: 16;
    readonly inset: 16;
};
/** Chips wrap at 8 and never scroll sideways. */
export declare const ChipGap = 8;
/** The page frame. */
export declare const Frame: {
    readonly railWidth: 216;
    readonly railPadV: 24;
    readonly railPadH: 16;
    readonly railRow: 32;
    readonly railActiveBar: 3;
    readonly railGroupLabel: 10;
    readonly gutter: 24;
    readonly gutterPhone: 16;
    /** Content column max widths. Chosen by the header variant, never by the page. */
    readonly width: {
        readonly prose: 800;
        readonly doc: 960;
        readonly wide: 1440;
    };
};
export type FrameWidth = keyof typeof Frame.width;
/** Minimum touch target, any platform. */
export declare const MinTouch = 44;
