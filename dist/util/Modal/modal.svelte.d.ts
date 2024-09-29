import type { ModalSettings } from './types.js';
export declare function getModalStore(): ModalStore;
export declare function initModalStore(): ModalStore;
export type ModalStore = ReturnType<typeof modalService>;
declare const modalService: () => {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ModalSettings[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    set: (this: void, value: ModalSettings[]) => void;
    update: (this: void, updater: import("svelte/store").Updater<ModalSettings[]>) => void;
    trigger: (modal: ModalSettings) => void;
    close: () => void;
    clear: () => void;
};
export {};
