import type { DefaultPopup, PopupSettings } from '../../index.js';
import { popup as popupAction } from '../../actions/popup.js';
import type { Snippet } from 'svelte';
declare const Popup: import("svelte").Component<Omit<Partial<PopupSettings>, "target" | "state"> & DefaultPopup & {
    id?: string;
    Toggle?: Snippet<[{
        isOpen: boolean;
        chevron: Snippet;
    }]>;
    ToggleRoot?: Snippet<[{
        settings: PopupSettings;
        popup: typeof popupAction;
        isOpen: boolean;
        chevron: Snippet;
    }]>;
    Popup: Snippet<[isOpen: boolean]>;
}, {}, "">;
export default Popup;
