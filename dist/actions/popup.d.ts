import { type Writable } from 'svelte/store';
import type { Placement } from '@floating-ui/dom';
export interface Middleware {
    /** Offset middleware settings: https://floating-ui.com/docs/offset. */
    offset?: number | Record<string, any>;
    /** Shift middleware settings: https://floating-ui.com/docs/shift. */
    shift?: Record<string, any>;
    /** Flip middleware settings: https://floating-ui.com/docs/flip. */
    flip?: Record<string, any>;
    /** Arrow middleware settings: https://floating-ui.com/docs/arrow. */
    arrow?: {
        element: string;
    } & Record<string, any>;
    /** Size middleware settings: https://floating-ui.com/docs/size. */
    size?: Record<string, any>;
    /** Auto Placement middleware settings: https://floating-ui.com/docs/autoPlacement. */
    autoPlacement?: Record<string, any>;
    /** Hide middleware settings: https://floating-ui.com/docs/hide. */
    hide?: Record<string, any>;
    /** Inline middleware settings: https://floating-ui.com/docs/inline. */
    inline?: Record<string, any>;
}
export interface PopupSettings {
    /**
     * Event trigger type.
     */
    event: 'click' | 'hover' | 'focus-blur' | 'focus-click';
    /** Match the popup data value `data-popup="targetNameHere"`. */
    target: string;
    /**
     * Should clicking outside the popup, close the popup.
     * @default true
     */
    outsideClose?: boolean;
    /**
     * Set the placement position.
     * @default 'bottom'.
     */
    placement?: Placement;
    /**
     * Query elements that close the popup when clicked.
     * @default 'a[href], button'
     */
    closeQuery?: string;
    /** Optional callback function that reports state change. */
    state?: (event: {
        state: boolean;
    }) => void;
    /** Provide Floating UI middleware settings. */
    middleware?: Middleware;
    /**
     * Close the popup on mouse down even instead of mouse click
     * @default 'a[href], button'
     */
    closeOnMouseDown?: boolean;
}
export declare const storePopup: Writable<any>;
export declare const initPopupStore: () => void;
export declare const popup: (triggerNode: HTMLElement, args: PopupSettings) => {
    update(newArgs: PopupSettings): void;
    destroy(): void;
};
