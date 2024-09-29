import { type ToastItem } from './toast.svelte';
import type { Snippet } from 'svelte';
declare const Toast: import("svelte").Component<{
    rootCss?: string;
    closeBtnCss?: string;
    toastCss?: string;
    typeColors?: {
        info: string;
        success: string;
        warning: string;
        error: string;
        primary: string;
    };
    toast?: Snippet<[t: ToastItem & {
        countdown?: number;
    }]>;
}, {}, "">;
export default Toast;
