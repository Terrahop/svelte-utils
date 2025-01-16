/**
 * A svelte action to handle clicking off a component to toggle it(dropdowns, modals, sidebars etc).
 * @param element - HTML element to use to determine whether clicked outside.
 * @param callback - Called when clicked outside.
 * @returns Svelte update and destroy callbacks for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div use:clickOutside={() => console.log('Clicked outside!')} />
 * ```
 */
export function clickOutside(element, callback) {
    /**
     * Callback onclick function.
     * @param event - Mouse click event.
     */
    const onClick = (event) => {
        if (!element.contains(event.target) && !event.defaultPrevented) {
            callback(event);
        }
    };
    // Use a delay to prevent the click setting states too quickly.
    setTimeout(() => {
        document.body.addEventListener('click', onClick, true);
    }, 50);
    return {
        update(newCallbackFunction) {
            callback = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick, true);
        }
    };
}
