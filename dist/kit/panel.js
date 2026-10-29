import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from 'react-native';
import { useKit } from './skin';
/**
 * A panel on the page: one hairline, the skin's panel radius, 16 inside. `tone: 'raised'` fills it
 * a step off the page ground; the default is the page colour, the quietest surface there is.
 */
export function Panel({ children, tone = 'flat', style, }) {
    const { colors, skin } = useKit();
    return (_jsx(View, { style: [
            styles.panel,
            {
                borderRadius: skin.radius.panel,
                borderColor: colors.hairline,
                backgroundColor: tone === 'raised' ? colors.backgroundElement : colors.background,
            },
            style,
        ], children: children }));
}
const styles = StyleSheet.create({
    panel: { borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 8 },
});
