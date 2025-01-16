/**
 * A svelte Rune that persists it's state using either the session storage or local storage.
 * TODO: document.
 * @returns Rune getters and setters.
 */
export declare const localStore: {
    create<T>(name: string, initial?: T, session?: boolean): {
        get: T;
        set(v: T): void;
        update(updater: (value: T) => T): void;
    };
    clear(): void;
    subscribe(): void;
};
