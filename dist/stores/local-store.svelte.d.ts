export type LocalStore = typeof localStore.create;
/**
 * A svelte Rune that persists it's state using either the session storage or local storage.
 * @returns Rune getters and setters.
 */
export declare const localStore: {
    create<T>(name: string, initial?: T, session?: boolean): {
        get: T;
        set(v: T): void;
        update(updater: (value: T) => T): void;
    };
    remove(name: string): void;
    clear(): void;
    /**
     * Subscribe to an effect which syncs the value to localStorage.
     * @deprecated Not needed anymore.
     */
    subscribe(): void;
    /**
     * Cleanup the root effect.
     */
    cleanup(): void;
};
