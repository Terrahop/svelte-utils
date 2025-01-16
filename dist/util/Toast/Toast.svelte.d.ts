import { type ToastItem } from './toast.svelte.js';
import type { Snippet } from 'svelte';
declare const Toast: import("svelte").Component<{
    /** Root css. */
    rootCss?: string;
    closeBtnCss?: string;
    toastCss?: string;
    /**
     * Toast position.
     * @default 'toast-end toast-bottom'.
     */
    typeColors?: {
        info: string;
        success: string;
        warning: string;
        error: string;
        primary: string;
    };
    /** A custom toast component, proves the toast and countdown as props. */
    toast?: Snippet<[t: ToastItem & {
        countdown?: number;
    }]>;
}, {}, "">;
export default Toast;
