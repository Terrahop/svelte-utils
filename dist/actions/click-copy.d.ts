/**
 * A svelte action to copy text of a clicked element to the clipboard.
 * @param element - HTML element to attach to.
 * @param params - Optional action params.
 * @param params.target - Optionally provide a target element query selector to get the text content from.
 * @param params.onCopy - Optionally provide the callback if text is successfully copied.
 * @returns Svelte destroy callback for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div use:clickCopy={{target: '#myelement', onCopy: (v) => console.log(v) }} />
 * ```
 */
export declare const clickCopy: (element: HTMLElement, params?: {
    target?: string;
    onCopy?: (v: string) => void;
}) => {
    update: (opts: {
        target?: string;
        callback?: () => void;
    }) => void;
    destroy: () => void;
};
