const preventScrollFunc = (e) => {
    e.preventDefault();
};
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
export const preventScroll = (node, enabled = true) => {
    if (enabled)
        node.addEventListener('wheel', preventScrollFunc);
    return {
        update(enabledd) {
            enabled = enabledd;
        },
        destroy() {
            node.removeEventListener('wheel', preventScrollFunc);
        }
    };
};
