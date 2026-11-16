import { type ReactNode } from 'react';
import { type ToastAction, type ToastTone } from './toast';
/**
 * One toast host per app (v0.14): `<ToastProvider>` near the root, `useToast().show({...})`
 * anywhere. One toast at a time; a newer one replaces it. It sits centred, `ToastSize.inset` above
 * the bottom edge (plus the safe area), and leaves by itself after `duration`:
 * 1.8 s alone, 4 s with an action, unless the caller sets it.
 */
export interface ToastSpec {
    message: string;
    tone?: ToastTone;
    action?: ToastAction;
    actions?: readonly ToastAction[];
    lead?: ReactNode;
    thumb?: ReactNode;
    /** ms before it leaves; 0 keeps it until dismissed or replaced. */
    duration?: number;
    /** Draws the timer bar (default true when the toast leaves by itself). */
    timerBar?: boolean;
    /** 0..1, a work bar instead of the timer; the toast stays until updated or hidden. */
    progress?: number;
    /** Show an X (default true for toned toasts). */
    closable?: boolean;
    /** Lines the message may wrap to (default 1). */
    lines?: number;
}
export interface ToastApi {
    /** Shows a toast, replacing any on screen. Returns its id, for `hide(id)`. */
    show: (spec: ToastSpec) => number;
    /** Hides the toast (only if it is still `id`, when given). */
    hide: (id?: number) => void;
}
export declare const ToastDuration: {
    readonly alone: 1800;
    readonly withAction: 4000;
};
/** The app's toast API. Outside a provider it does nothing (so a screen never crashes). */
export declare function useToast(): ToastApi;
export declare function ToastProvider({ children, bottomOffset }: {
    children: ReactNode;
    bottomOffset?: number;
}): import("react").JSX.Element;
