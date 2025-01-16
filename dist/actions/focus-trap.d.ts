/**
 * Force focus of first focusable element (button, a, input etc).
 * Adapted from: https://github.com/skeletonlabs/skeleton/blob/dev/packages/skeleton/src/lib/actions/FocusTrap/focusTrap.ts.
 * @param element - HTML element to attach to.
 * @param enabled - Is enabled.
 * @returns Svelte update and destroy callbacks for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div use:focusTrap={true} />
 * ```
 */
export declare const focusTrap: (element: HTMLElement, enabled: boolean) => {
    update(newArgs: boolean): void;
    destroy(): void;
};
