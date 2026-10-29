import type { ReactNode } from 'react';
/** Reading measure inside the 960 doc column, so a guide reads like a page. */
export declare const DOC_MEASURE = 680;
/** A section of a doc page: a 17 heading and its paragraphs, 8 apart. */
export declare function DocSection({ heading, children }: {
    heading?: string;
    children: ReactNode;
}): import("react").JSX.Element;
/** Body copy at 16 on 24, in the secondary ink, held to the reading measure. */
export declare function DocText({ children, tone }: {
    children: ReactNode;
    tone?: 'primary' | 'secondary' | 'meta';
}): import("react").JSX.Element;
