import { type Writable } from 'svelte/store';
import type { Placement } from '@floating-ui/dom';
export interface Middleware {
    offset?: number | Record<string, any>;
    shift?: Record<string, any>;
    flip?: Record<string, any>;
    arrow?: {
        element: string;
    } & Record<string, any>;
    size?: Record<string, any>;
    autoPlacement?: Record<string, any>;
    hide?: Record<string, any>;
    inline?: Record<string, any>;
}
export interface PopupSettings {
    event: 'click' | 'hover' | 'focus-blur' | 'focus-click';
    target: string;
    outsideClose?: boolean;
    placement?: Placement;
    closeQuery?: string;
    state?: (event: {
        state: boolean;
    }) => void;
    middleware?: Middleware;
}
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
