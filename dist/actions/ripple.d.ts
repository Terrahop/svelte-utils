import type { ActionReturn } from 'svelte/action';
/**
 * Create a ripple function with parameters to use with svelte components.
 * @param centered - Wether to ripple from center only.
 * @returns Function to use with svelte `use` directive.
 */
declare const createRipple: (centered?: boolean) => ((node: Element) => ActionReturn);
/** Ripple function to use with svelte `use` directive. */
export declare const ripple: (node: Element) => ActionReturn;
export default createRipple;
