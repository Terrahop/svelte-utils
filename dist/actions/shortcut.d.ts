interface ShortcutParams {
    alt?: boolean;
    shift?: boolean;
    control?: boolean;
    callback?: () => void;
    key?: KeyboardEvent['key'];
}
/**
 * Attach a keyboard shortcut handler to an element.
 * @param element - HTML element to attach to.
 * @param params - Shortcut params.
 * @returns Svelte update and destroy callbacks for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div
 * use:shortcut={{
 *   control: true,
 *   key: 'e',
 *   callback: onShortcut
 * }}></div>
 * ```
 */
export declare const shortcut: (element: HTMLElement, params: ShortcutParams) => {
    update: () => void;
    destroy: () => void;
};
export {};
