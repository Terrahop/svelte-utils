import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
const MODAL_STORE_KEY = 'modalStore';
export function getModalStore() {
    const modalStore = getContext(MODAL_STORE_KEY);
    if (!modalStore) {
        throw new Error('modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!');
    }
    return modalStore;
}
export function initModalStore() {
    const modalStore = modalService();
    return setContext(MODAL_STORE_KEY, modalStore);
}
const modalService = () => {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        set,
        update,
        trigger: (modal) => {
            update((mStore) => {
                mStore.push(modal);
                return mStore;
            });
        },
        close: () => {
            update((mStore) => {
                if (mStore.length > 0)
                    mStore.shift();
                return mStore;
            });
        },
        clear: () => {
            set([]);
        }
    };
};
