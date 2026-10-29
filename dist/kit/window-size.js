import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';
const SERVER = { width: 0, height: 0 };
let current = SERVER;
function snapshot() {
    const { width, height } = Dimensions.get('window');
    if (width !== current.width || height !== current.height)
        current = { width, height };
    return current;
}
function subscribe(onChange) {
    const sub = Dimensions.addEventListener('change', onChange);
    return () => sub.remove();
}
export function useWindowSize() {
    return useSyncExternalStore(subscribe, snapshot, () => SERVER);
}
