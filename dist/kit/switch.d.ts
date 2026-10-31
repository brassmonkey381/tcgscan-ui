/**
 * An on/off switch that says which it is: the state is written in the track beside the knob, the
 * track changes colour, and the knob slides, all animated (owner, 2026-10-31: a change of state
 * always animates). Colours come from KitSkin.switch; without it, the palette's accent and panel.
 */
export declare function Switch({ value, onValueChange, accessibilityLabel, disabled, }: {
    value: boolean;
    onValueChange: (next: boolean) => void;
    accessibilityLabel?: string;
    disabled?: boolean;
}): import("react").JSX.Element;
/** For a host that lays out its own switch row. */
export declare const SwitchSize: {
    readonly width: 64;
    readonly height: 30;
};
