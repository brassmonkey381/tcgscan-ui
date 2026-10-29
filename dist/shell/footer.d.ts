export interface FooterLink {
    label: string;
    onPress: () => void;
}
/** The footer slot at the bottom of the content column: the same links on every page. */
export declare function Footer({ links, note }: {
    links: readonly FooterLink[];
    note?: string;
}): import("react").JSX.Element;
