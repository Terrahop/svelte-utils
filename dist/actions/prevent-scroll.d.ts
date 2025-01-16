import type { ActionReturn } from 'svelte/action';
/**
 * A svelte action to prevent scroll behaviour on target element.
 * @param node - HTML element to attach to.
 * @param enabled - Is enabled. Defaults to true.
 * @example ```svelte
 * <div use:preventScroll />
 * <!-- Disabled -->
 * <div use:preventScroll={false} />
 * ```
 */
export declare const preventScroll: (node: HTMLElement, enabled?: boolean) => ActionReturn<boolean>;
