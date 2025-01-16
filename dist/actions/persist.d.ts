import type { StateRune } from '../types.js';
interface BasePersistConfig {
    /**
     * The event to listen to for persisting the form state.
     * @default 'input'
     */
    persistOn?: 'input' | 'change' | 'blur';
    /**
     * Setting this to `false` will cause the password fields to be persisted. Highly discouraged.
     *
     * This is a massive security risk, only use this if you know what you are doing.
     * @default true
     */
    ignorePassword?: boolean;
    /**
     * Clear local storage that is associated with the element when the form is submitted.
     * @default true
     */
    clearOnSubmit?: boolean;
}
type PersistConfigWithKey = BasePersistConfig & {
    key: string;
    /**
     * The storage to use for persisting the form state. (local, session).
     * @default 'local'
     */
    storage?: 'local' | 'session';
};
type PersistConfigWithStore = BasePersistConfig & {
    store: StateRune<any>;
};
type PersistConfig = PersistConfigWithKey | PersistConfigWithStore;
/**
 * Persist all child form elements.
 * adapted from: https://github.com/fawaz-alesayi/svelte-use-persist
 * @param element HTML element to attach to.
 * @param config Persist config.
 */
export declare function persist(element: HTMLElement, config: PersistConfig): {
    destroy(): void;
};
export {};
