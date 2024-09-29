import type { StateRune } from '../types.js';
interface BasePersistConfig {
    persistOn?: 'input' | 'change' | 'blur';
    ignorePassword?: boolean;
    clearOnSubmit?: boolean;
}
type PersistConfigWithKey = BasePersistConfig & {
    key: string;
    storage?: 'local' | 'session';
};
type PersistConfigWithStore = BasePersistConfig & {
    store: StateRune<any>;
};
type PersistConfig = PersistConfigWithKey | PersistConfigWithStore;
export declare function persist(element: HTMLElement, config: PersistConfig): {
    destroy(): void;
};
export {};
