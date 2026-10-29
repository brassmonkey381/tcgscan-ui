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
export const Height = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

export type ControlSize = keyof typeof Height;

/** Horizontal padding and label size per control height. */
export const ControlPad = { sm: 12, md: 16, lg: 20 } as const;

/** The type scale. Body is 16. */
export const TypeScale = {
  meta: 13,
  control: 14,
  body: 16,
  sheetTitle: 17,
  h3: 22,
  h1: 28,
  hero: 40,
} as const;

/** Label size per control height: 13 on small, 14 on medium and large. */
export const ControlText = { sm: TypeScale.meta, md: TypeScale.control, lg: TypeScale.control } as const;

/** Segment groups: the inner pad, so each option sits `Height[size] - 2 * pad` tall. */
export const SegPad = 2;

/** Settings / inspector rows. */
export const RowSize = {
  height: 48,
  labelWidth: 96,
  sidePad: 16,
  gap: 12,
} as const;

/** Bottom sheets and dialogs. Buttons in the button row are equal width, 12 apart. */
export const SheetSize = {
  titleRow: 56,
  buttonRow: 72,
  sidePad: 20,
  bodyPad: 20,
  buttonGap: 12,
  maxWidth: 560,
  dialogMaxWidth: 400,
  dialogPad: 24,
} as const;

/** Toast: one line, one action, 16 above the bottom edge on phones. */
export const ToastSize = {
  height: 48,
  sidePad: 16,
  inset: 16,
} as const;

/** Chips wrap at 8 and never scroll sideways. */
export const ChipGap = 8;

/** The page frame. */
export const Frame = {
  railWidth: 216,
  railPadV: 24,
  railPadH: 16,
  railRow: 32,
  railActiveBar: 3,
  railGroupLabel: 10,
  gutter: 24,
  gutterPhone: 16,
  /** Content column max widths. Chosen by the header variant, never by the page. */
  width: {
    prose: 800,
    doc: 960,
    wide: 1440,
  },
} as const;

export type FrameWidth = keyof typeof Frame.width;

/** Minimum touch target, any platform. */
export const MinTouch = 44;
