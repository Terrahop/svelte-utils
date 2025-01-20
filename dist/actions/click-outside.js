/**
 * A svelte action to handle clicking off a component to toggle it(dropdowns, modals, sidebars etc).
 * @param element - HTML element to use to determine whether clicked outside.
 * @param args - Args.
 * @example ```svelte
 * <div use:clickOutside={{ cb: () => console.log('Mousedown outside!'), mousedown: true }} />
 * <div use:clickOutside={cb: () => console.log('Clicked outside!')} />
 * ```
 */
export const clickOutside = (element, args) => {
    let cb;
    let mousedown;
    const setArgs = () => {
        cb = typeof args === 'object' ? args.cb : args;
        mousedown = typeof args === 'object' ? args.mousedown : undefined;
    };
    setArgs();
    /**
     * Callback onclick function.
     * @param event - Mouse click event.
     */
    const onClick = (event) => {
        if (!element.contains(event.target) && !event.defaultPrevented) {
            cb(event);
        }
    };
    // Use a delay to prevent the click setting states too quickly.
    setTimeout(() => {
        document.body.addEventListener(mousedown ? 'mousedown' : 'click', onClick, true);
    }, 50);
    return {
        update(newCallbackFunction) {
            args = newCallbackFunction;
            setArgs();
        },
        destroy() {
            document.body.removeEventListener(mousedown ? 'mousedown' : 'click', onClick, true);
        }
    };
};
