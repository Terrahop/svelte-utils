/**
 * Tiny helper to focus an element when it mounts.
 * @param node - HTML element to attach to.
 * @example ```svelte
 * <div use:focus />
 * ```
 */
export const focus = (node) => {
    node.focus();
};
