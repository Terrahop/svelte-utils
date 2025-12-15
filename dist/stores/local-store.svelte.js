import { isBrowser } from '../helpers.js';
/**
 * Get a reference to the storage type.
 * @param session - Local storage type.
 * @returns Either session or local storage.
 */
const getStorage = (session) => {
    // eslint-disable-next-line sonarjs/no-selector-parameter
    return session ? sessionStorage : localStorage;
};
/**
 * Get a value for the a storage.
 * @param key - Key to get value for.
 * @param session - Local storage type.
 * @returns Either session or local storage.
 */
const getStorageValue = (key, session = false) => {
    const json = isBrowser ? getStorage(session).getItem(key) ?? undefined : undefined;
    let value;
    if (json && json !== 'undefined') {
        try {
            value = JSON.parse(json);
        }
        catch (error) {
            console.error('localStore error', error, json);
        }
    }
    return value;
};
const removeStorageValue = (key, session = false) => {
    getStorage(session).removeItem(key);
};
const localStoreCreate = () => {
    const stores = $state({});
    const cleanup = $effect.root(() => {
        if (isBrowser) {
            $effect(() => {
                for (const [key, value] of Object.entries(stores)) {
                    if (!value)
                        continue;
                    // Only update the storage if the value has changed
                    if (JSON.stringify(getStorageValue(key, value.session)) !== JSON.stringify(value.value)) {
                        const storage = getStorage(value.session);
                        storage.setItem(key, JSON.stringify(value.value));
                    }
                }
            });
        }
    });
    return {
        create(name, initial, session = false) {
            const value = getStorageValue(name, session);
            stores[name] = { session, value: value ?? initial };
            return {
                get get() {
                    return stores[name]?.value;
                },
                set get(v) {
                    stores[name] = { value: v, session };
                },
                set(v) {
                    stores[name] = { value: v, session };
                },
                update(updater) {
                    const value = stores[name];
                    const result = updater(value?.value);
                    stores[name] = { value: result, session };
                }
            };
        },
        remove(name) {
            const store = stores[name];
            stores[name] = undefined;
            removeStorageValue(name, store?.session);
        },
        clear() {
            if (isBrowser) {
                localStorage.clear();
                sessionStorage.clear();
            }
        },
        /**
         * Subscribe to an effect which syncs the value to localStorage.
         * @deprecated Not needed anymore.
         */
        subscribe() {
            console.info('localStore.subsribe() is no longer necessary');
        },
        /**
         * Cleanup the root effect.
         */
        cleanup() {
            cleanup();
        }
    };
};
/**
 * A svelte Rune that persists it's state using either the session storage or local storage.
 * @returns Rune getters and setters.
 */
export const localStore = localStoreCreate();
