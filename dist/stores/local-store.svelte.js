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
 * @param session - Local storage type.
 * @param key - Key to get value for.
 * @returns Either session or local storage.
 */
const getStorageValue = (session, key) => {
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
const localStoreCreate = () => {
    const stores = $state({});
    return {
        create(name, initial, session = false) {
            const value = getStorageValue(session, name);
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
        clear() {
            if (isBrowser) {
                localStorage.clear();
                sessionStorage.clear();
            }
        },
        subscribe() {
            if (isBrowser) {
                $effect(() => {
                    for (const [key, value] of Object.entries(stores)) {
                        if (!value)
                            continue;
                        // Only update the storage if the value has changed
                        if (JSON.stringify(getStorageValue(value.session, key)) !== JSON.stringify(value.value)) {
                            const storage = getStorage(value.session);
                            storage.setItem(key, JSON.stringify(value.value));
                        }
                    }
                });
            }
        }
    };
};
/**
 * A svelte Rune that persists it's state using either the session storage or local storage.
 * TODO: document.
 * @returns Rune getters and setters.
 */
export const localStore = localStoreCreate();
