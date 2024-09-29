import { type Writable } from 'svelte/store';
import type { PopupSettings } from './types.js';
import type { Placement } from '@floating-ui/dom';
export declare const storePopup: Writable<any>;
export declare const initPopupStore: () => void;
export declare const createTooltip: ({ position }: {
    position?: Placement;
}) => {
    popup: (triggerNode: HTMLElement, args: PopupSettings) => {
        update(newArgs: PopupSettings): void;
        destroy(): void;
    };
    opts: PopupSettings;
    id: string;
};
export declare const popup: (triggerNode: HTMLElement, args: PopupSettings) => {
    update(newArgs: PopupSettings): void;
    destroy(): void;
};
