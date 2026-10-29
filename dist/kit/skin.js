import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { Chrome, Colors, Radius } from 'tcgscan-theme';
/** Today's TCGScan skin: tcgscan-theme's radius tokens, one radius per role. */
export const tcgscanSkin = {
    radius: {
        button: Radius.pill,
        chip: Radius.pill,
        input: Radius.control,
        panel: Radius.panel,
        sheet: Radius.sheet,
        dialog: Radius.lg,
        toast: Radius.panel,
    },
};
/** The fixed dark glass toasts sit on; scheme-independent by design. */
export const KitChrome = Chrome;
const KitContext = createContext(null);
export function KitProvider({ colors, dark, skin = tcgscanSkin, children, }) {
    return _jsx(KitContext.Provider, { value: { colors, dark, skin }, children: children });
}
const FALLBACK = { colors: Colors.light, dark: false, skin: tcgscanSkin };
/** The palette and skin for kit components. Outside a provider it falls back to light TCGScan. */
export function useKit() {
    return useContext(KitContext) ?? FALLBACK;
}
