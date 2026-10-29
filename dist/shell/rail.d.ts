import { type ReactNode } from 'react';
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
export declare function Rail({ brand, groups, footer }: {
    brand?: ReactNode;
    groups: readonly RailGroup[];
    footer?: ReactNode;
}): import("react").JSX.Element;
/** The phone form of the rail: the same groups in a drawer from the left edge. */
export declare function Drawer({ visible, onClose, brand, groups, }: {
    visible: boolean;
    onClose: () => void;
    brand?: ReactNode;
    groups: readonly RailGroup[];
}): import("react").JSX.Element;
