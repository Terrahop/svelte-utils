import type { Action } from 'svelte/action';
interface Args {
    /** Called when clicked outside. */
    cb: (event: MouseEvent) => void;
    /** Use mousedown event instead of click event. */
    mousedown?: boolean;
}
/**
 * A svelte action to handle clicking off a component to toggle it(dropdowns, modals, sidebars etc).
 * @param element - HTML element to use to determine whether clicked outside.
 * @param args - Args.
 * @example ```svelte
 * <div use:clickOutside={{ cb: () => console.log('Mousedown outside!'), mousedown: true }} />
 * <div use:clickOutside={cb: () => console.log('Clicked outside!')} />
 * ```
 */
export declare const clickOutside: Action<HTMLElement, Args | ((event: MouseEvent) => void)>;
export {};
