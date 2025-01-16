import type { PopupSettings } from './actions/popup.js';
type ExtractMerge<T extends string> = T extends `${string}Merge` ? T : never;
export interface Defaults {
    popup?: {
        class?: string;
        classMerge?: string;
        cMerge?: string;
        cContent?: string;
        cContentMerge?: string;
        cPopup?: string;
        cPopupMerge?: string;
        closeHidden?: boolean;
        cZ?: string;
    };
    popupSettings?: Omit<PopupSettings, 'state' | 'middleware'>;
}
export type DefaultPopup = Omit<NonNullable<Defaults['popup']>, ExtractMerge<keyof Defaults['popup']>>;
export declare const setDefaults: (value: Defaults) => void;
export declare const getDefaults: (value: Defaults) => void;
export * from './util/index.js';
export * from './actions/index.js';
export * from './stores/index.js';
export * from './components/index.js';
