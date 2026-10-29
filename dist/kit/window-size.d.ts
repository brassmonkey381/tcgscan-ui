/**
 * The window size, hydration-safe.
 *
 * `useWindowDimensions` reads the real window on the very first client render, but a static web
 * export rendered its HTML with no window at all, so any layout that branches on width (the rail,
 * a grid's column count) disagreed with the HTML it was hydrating and React threw the whole tree
 * away. This reports the server's answer (0 x 0, the phone layout) while hydrating and the real
 * size right after, which is what hydration expects. Native never hydrates, so there it is simply
 * the window, live, like `useWindowDimensions`.
 */
export interface WindowSize {
    width: number;
    height: number;
}
export declare function useWindowSize(): WindowSize;
