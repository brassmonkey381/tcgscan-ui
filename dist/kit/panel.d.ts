import type { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * A panel on the page: one hairline, the skin's panel radius, 16 inside. `tone: 'raised'` fills it
 * a step off the page ground; the default is the page colour, the quietest surface there is.
 */
export declare function Panel({ children, tone, style, }: {
    children: ReactNode;
    tone?: 'flat' | 'raised';
    style?: StyleProp<ViewStyle>;
}): import("react").JSX.Element;
