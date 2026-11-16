import { type ReactNode } from 'react';
/**
 * The four toast tones (v0.14): one shell, a different mark. `limit` also gets an accent edge.
 *   info     a grey i: something happened (Binder duplicated)
 *   success  a green tick: it worked (Downloaded)
 *   limit    a blue star and an accent edge: a plan limit, with its offer as the action
 *   warning  an amber !: it worked with a catch (offline, saved on this device)
 *   error    a red !: it failed, with Retry as the action
 */
export type ToastTone = 'info' | 'success' | 'limit' | 'warning' | 'error';
export interface ToastAction {
    label: string;
    onPress: () => void;
}
/**
 * A toast: 48 tall, one line, one action. Fixed dark glass so it reads over any content.
 * Presentational only; the host decides where it sits (16 above the bottom edge on phones), or
 * use `ToastProvider` + `useToast()` and it sits there for you.
 *
 * Without a `tone` it is the original toast: it arrives with a small pop (fade in, rising from 92%
 * to full size). With a tone (v0.14) it also rises 12 from below, shows the tone's mark, an
 * optional picture (`thumb`), an X when `onClose` is set, and a bar that runs down over
 * `duration` ms so the reader sees how long it stays.
 */
export declare function Toast({ message, action, actions, tone, lead, thumb, onClose, duration, progress, }: {
    message: string;
    action?: ToastAction;
    /** Up to two actions (View + Undo); the last is the main one. Used instead of `action` when set. */
    actions?: readonly ToastAction[];
    tone?: ToastTone;
    /** Replaces the tone's mark with the app's own picture (a mascot face, an icon). */
    lead?: ReactNode;
    /** A small picture after the mark (the card that was just added). */
    thumb?: ReactNode;
    /** Shows an X; called when it is pressed. */
    onClose?: () => void;
    /** Draws the timer bar along the bottom edge, running down over this many ms. */
    duration?: number;
    /** A work bar along the bottom edge, 0..1 ("Adding 12 of 40"); shown instead of the timer bar. */
    progress?: number;
}): import("react").JSX.Element;
