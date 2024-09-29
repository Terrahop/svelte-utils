export declare const localStore: {
    create<T>(name: string, initial?: T, session?: boolean): {
        get: T;
        set(v: T): void;
        update(updater: (value: T) => T): void;
    };
    clear(): void;
    subscribe(): void;
};
