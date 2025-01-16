/**
 * A svelte action to handle clicking off a component to toggle it(dropdowns, modals, sidebars etc).
 * @param element - HTML element to use to determine whether clicked outside.
 * @param callback - Called when clicked outside.
 * @returns Svelte update and destroy callbacks for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div use:clickOutside={() => console.log('Clicked outside!')} />
 * ```
 */
export declare function clickOutside(element: HTMLElement, callback: (event: MouseEvent) => void): {
    update: (newCallback: (event: MouseEvent) => void) => void;
    destroy: () => void;
};
