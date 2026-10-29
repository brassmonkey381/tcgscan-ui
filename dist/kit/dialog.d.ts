import { type SheetAction } from './sheet';
/**
 * A dialog asks one thing. Two buttons split the width, the safe choice on the left. Danger is the
 * Secondary look in the danger tint (`tone: 'danger'`), never a red outline.
 */
export declare function Dialog({ visible, title, body, cancel, confirm, onClose, }: {
    visible: boolean;
    title: string;
    body?: string;
    cancel: SheetAction;
    confirm: SheetAction;
    onClose: () => void;
}): import("react").JSX.Element;
