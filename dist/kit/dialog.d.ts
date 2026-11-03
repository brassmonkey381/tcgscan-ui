import type { ReactNode } from 'react';
import { type SheetAction } from './sheet';
/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 *
 * `children` sit between the body and the buttons: a typed field (a collection name, DELETE), a
 * preview line or a third answer, so every question in an app can be this one dialog.
 */
/**
 * How long a closing pop-up takes to leave. A layer opened from a closing layer starts after this,
 * so two pop-ups never cross (and iOS never shows two Modals at once).
 */
export declare const POPUP_DISMISS_MS = 350;
export declare function Dialog({ visible, title, body, cancel, confirm, onClose, children, }: {
    visible: boolean;
    title: string;
    body?: string;
    cancel: SheetAction;
    confirm: SheetAction;
    onClose: () => void;
    children?: ReactNode;
}): import("react").JSX.Element;
