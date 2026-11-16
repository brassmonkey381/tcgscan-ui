import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastSize } from './scale';
import { Toast } from './toast';
export const ToastDuration = { alone: 1800, withAction: 4000 };
const NOOP = { show: () => 0, hide: () => { } };
const ToastContext = createContext(null);
/** The app's toast API. Outside a provider it does nothing (so a screen never crashes). */
export function useToast() {
    return useContext(ToastContext) ?? NOOP;
}
export function ToastProvider({ children, bottomOffset = 0 }) {
    const insets = useSafeAreaInsets();
    const [current, setCurrent] = useState(null);
    const seq = useRef(0);
    const timer = useRef(null);
    const hide = useCallback((id) => {
        setCurrent((c) => (c && (id == null || c.id === id) ? null : c));
    }, []);
    const show = useCallback((spec) => {
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
        if (timer.current)
            clearTimeout(timer.current);
        if (!current || !life)
            return;
        const id = current.id;
        timer.current = setTimeout(() => hide(id), life);
        return () => {
            if (timer.current)
                clearTimeout(timer.current);
        };
    }, [current, life, hide]);
    const api = useMemo(() => ({ show, hide }), [show, hide]);
    const wrap = (a) => a && { label: a.label, onPress: () => { hide(current?.id); a.onPress(); } };
    return (_jsxs(ToastContext.Provider, { value: api, children: [children, current ? (_jsx(View, { pointerEvents: "box-none", style: [styles.host, { bottom: ToastSize.inset + insets.bottom + bottomOffset }], children: _jsx(View, { style: styles.slot, children: _jsx(Toast, { message: current.message, tone: current.tone, action: wrap(current.action), actions: current.actions?.map((a) => wrap(a)), lead: current.lead, thumb: current.thumb, progress: current.progress, duration: life && current.timerBar !== false ? life : undefined, onClose: (current.closable ?? !!current.tone) ? () => hide(current.id) : undefined }, current.id) }) })) : null] }));
}
const styles = StyleSheet.create({
    host: { position: 'absolute', left: ToastSize.inset, right: ToastSize.inset, alignItems: 'center', zIndex: 1000 },
    slot: { width: '100%', maxWidth: 520 },
});
