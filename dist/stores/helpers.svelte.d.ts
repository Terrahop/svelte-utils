import type { StateRune } from '../types.js';
/**
 * Create a simple svelte $state rune with a getter, setter and updater.
 * @param initial - Optional initial value.
 * @returns Svelte state getter and setter.
 */
export declare const createState: <T>(initial?: T) => StateRune<T>;
