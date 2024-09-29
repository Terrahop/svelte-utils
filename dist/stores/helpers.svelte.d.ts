import type { Updater } from "svelte/store";
export declare const createState: <T>(initial?: T) => {
    get: T;
    set: (instance: T) => T;
    update(updater: Updater<T>): void;
};
