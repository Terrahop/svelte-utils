import type { ModalSettings } from './types.js';
/**
 * Retrieves the `modalStore`.
 *
 * This can *ONLY* be called from the **top level** of components!
 * @example
 * ```svelte
 * <script>
 *  import { getModalStore } from "@skeletonlabs/skeleton";
 *
 *  const modalStore = getModalStore();
 *
 *  modalStore.trigger({ type: "alert", title: "Welcome!" });
 * </script>
 * ```
 */
export declare function getModalStore(): ModalStore;
/**
 * Initializes the `modalStore`.
 */
export declare function initModalStore(): ModalStore;
export type ModalStore = ReturnType<typeof modalService>;
declare const modalService: () => {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ModalSettings[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    set: (this: void, value: ModalSettings[]) => void;
    update: (this: void, updater: import("svelte/store").Updater<ModalSettings[]>) => void;
    /**
     * Append to end of queue.
     * @param modal - Modal settings.
     */
    trigger: (modal: ModalSettings) => void;
    /** Remove first item in queue. */
    close: () => void;
    /** Remove all items from queue. */
    clear: () => void;
};
export {};
