import './popup.css';
import type { DefaultPopup, PopupSettings } from '../../index.js';
import { popup as popupAction } from '../../actions/popup.js';
import type { Snippet } from 'svelte';
/**
 * Popup Component. Draws a floating popup when the provided snippet toggle is triggered
 *
 * ```tsx
 * <Popup>
 * // Either use Toggle which is the child of a div that uses the popup action
 * {#snippet Toggle({ isOpen, chevron })}
 *   <button>toggle</button>
 * {/snippet}
 *
 * // Or use ToggleRoot and pass along popup and options
 * {#snippet ToggleRoot({ settings, popup, isOpen, chevron })}
 *   <button use:popup={settings}>toggle</button>
 * {/snippet}
 *
 * // The popup content
 * {#snippet Popup(isOpen)}
 *   Popup Content
 * {/snippet}
 * </Popup>
 * ```
 */
declare const Popup: import("svelte").Component<Omit<Partial<PopupSettings>, "target" | "state"> & DefaultPopup & {
    id?: string;
    Toggle?: Snippet<[{
        isOpen: boolean;
        chevron: Snippet;
    }]>;
    /**
     * Root toggle snippet, use the to create the toggle popup element directly, it gets provided the
     * settings as a prop to the snippet. The element must be in the document on page render and you must use
     * the popup action provided in the snippet props on the element.
     * @example ```svelte
     *
     * ```
     */
    ToggleRoot?: Snippet<[{
        settings: PopupSettings;
        popup: typeof popupAction;
        isOpen: boolean;
        chevron: Snippet;
    }]>;
    Content: Snippet<[isOpen: boolean]>;
}, {}, "">;
export default Popup;
