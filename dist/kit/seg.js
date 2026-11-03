import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { animate, useReduceMotion } from './motion';
import { ControlPad, Height, SegPad, TypeScale, FontScaleCap } from './scale';
import { useKit } from './skin';
/**
 * A segment group: a panel-grey track, padded 2, with the chosen option lifted onto the surface.
 * `md` (44 outside) in sheets and forms, `sm` (36) inside rows and inspector sections.
 *
 * The chosen key slides to a new option over the motion ladder's state step (instant under Reduce
 * Motion). `fill` stretches the group across its line with equal segments, for a toggle that is
 * the only control on that line.
 */
export function Seg({ options, value, onChange, size = 'md', fill, accessibilityLabel, }) {
    const { colors, skin } = useKit();
    const reduce = useReduceMotion();
    const inner = Height[size] - SegPad * 2;
    const lip = skin.lip ? 3 : 0;
    const border = skin.lip ? 1.5 : 0;
    // Each option's place in the track, measured; the key slides between them.
    const [boxes, setBoxes] = useState({});
    const [x] = useState(() => new Animated.Value(0));
    const [w] = useState(() => new Animated.Value(0));
    const [placed, setPlaced] = useState(false);
    const target = boxes[value];
    useEffect(() => {
        if (!target)
            return;
        if (!placed) {
            x.setValue(target.x);
            w.setValue(target.w);
            setPlaced(true);
            return;
        }
        Animated.parallel([animate(x, target.x, 'state', { reduce }), animate(w, target.w, 'state', { reduce })]).start();
    }, [target, placed, reduce, x, w]);
    const measure = (v) => (e) => {
        const { x: bx, width } = e.nativeEvent.layout;
        setBoxes((b) => (b[v]?.x === bx && b[v]?.w === width ? b : { ...b, [v]: { x: bx, w: width } }));
    };
    return (_jsxs(View, { role: "radiogroup", accessibilityLabel: accessibilityLabel, style: [
            styles.track,
            fill && styles.fillTrack,
            { height: Height[size], borderRadius: skin.radius.chip, backgroundColor: colors.backgroundElement },
            skin.lip ? { borderWidth: border, borderColor: colors.controlBorder } : null,
        ], children: [placed ? (_jsx(Animated.View, { pointerEvents: "none", style: [
                    styles.key,
                    styles.on,
                    {
                        height: inner,
                        // Measured x counts from the track's outer edge; an absolute child counts from inside the border.
                        top: SegPad,
                        left: Animated.subtract(x, border),
                        width: w,
                        borderRadius: skin.radius.chip,
                        backgroundColor: skin.lip ? colors.accent : colors.background,
                    },
                    // On a lipped skin the chosen segment is a pressed-in key: the accent fill on its lip.
                    skin.lip ? { borderBottomWidth: lip, borderBottomColor: skin.lip.primary } : null,
                ] })) : null, options.map((o) => {
                const on = o.value === value;
                return (_jsx(Pressable, { role: "radio", "aria-checked": on, onPress: () => onChange(o.value), onLayout: measure(o.value), style: [styles.option, fill && styles.fillOption, { height: inner, borderRadius: skin.radius.chip }], children: _jsx(Text, { maxFontSizeMultiplier: FontScaleCap.control, selectable: false, numberOfLines: 1, style: [
                            styles.label,
                            { color: on ? (skin.lip ? colors.accentText : colors.text) : colors.textSecondary, fontWeight: on ? '600' : '500' },
                        ], children: o.label }) }, o.value));
            })] }));
}
const styles = StyleSheet.create({
    track: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: SegPad,
        gap: SegPad,
    },
    fillTrack: { alignSelf: 'stretch' },
    option: {
        paddingHorizontal: ControlPad.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fillOption: { flex: 1, minWidth: 0 },
    key: { position: 'absolute' },
    // The one allowed lift inside a control: the chosen segment sits on the surface.
    on: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    label: { fontSize: TypeScale.meta },
});
