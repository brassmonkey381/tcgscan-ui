import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToastSize } from './scale';
import { Toast, type ToastAction, type ToastTone } from './toast';

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

export const ToastDuration = { alone: 1800, withAction: 4000 } as const;

const NOOP: ToastApi = { show: () => 0, hide: () => {} };
const ToastContext = createContext<ToastApi | null>(null);

/** The app's toast API. Outside a provider it does nothing (so a screen never crashes). */
export function useToast(): ToastApi {
  return useContext(ToastContext) ?? NOOP;
}

export function ToastProvider({ children, bottomOffset = 0 }: { children: ReactNode; bottomOffset?: number }) {
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState<(ToastSpec & { id: number }) | null>(null);
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback((id?: number) => {
    setCurrent((c) => (c && (id == null || c.id === id) ? null : c));
  }, []);
  const show = useCallback((spec: ToastSpec) => {
    seq.current += 1;
    const id = seq.current;
    setCurrent({ ...spec, id });
    return id;
  }, []);

  const hasAction = !!(current?.action || current?.actions?.length);
  const life = current
    ? current.progress != null
      ? 0
      : current.duration ?? (hasAction ? ToastDuration.withAction : ToastDuration.alone)
    : 0;
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!current || !life) return;
    const id = current.id;
    timer.current = setTimeout(() => hide(id), life);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [current, life, hide]);

  const api = useMemo(() => ({ show, hide }), [show, hide]);
  const wrap = (a?: ToastAction) => a && { label: a.label, onPress: () => { hide(current?.id); a.onPress(); } };
  return (
    <ToastContext.Provider value={api}>
      {children}
      {current ? (
        <View pointerEvents="box-none" style={[styles.host, { bottom: ToastSize.inset + insets.bottom + bottomOffset }]}>
          <View style={styles.slot}>
            <Toast
              key={current.id}
              message={current.message}
              tone={current.tone}
              action={wrap(current.action)}
              actions={current.actions?.map((a) => wrap(a)!)}
              lead={current.lead}
              thumb={current.thumb}
              progress={current.progress}
              lines={current.lines}
              duration={life && current.timerBar !== false ? life : undefined}
              onClose={(current.closable ?? !!current.tone) ? () => hide(current.id) : undefined}
            />
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', left: ToastSize.inset, right: ToastSize.inset, alignItems: 'center', zIndex: 1000 },
  slot: { width: '100%', maxWidth: 520 },
});
