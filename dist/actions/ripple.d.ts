import type { ActionReturn } from 'svelte/action';
declare const createRipple: (centered?: boolean) => ((node: Element) => ActionReturn);
export declare const ripple: (node: Element) => ActionReturn;
export default createRipple;
