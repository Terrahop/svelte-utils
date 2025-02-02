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
export const focusTrap = (element, enabled) => {
    const elemWhitelist = 'a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';
    let elemFirst;
    let elemLast;
    // When the first element is selected, shift+tab pressed, jump to the last selectable item.
    const onFirstElemKeydown = (e) => {
        if (e.shiftKey && e.code === 'Tab') {
            e.preventDefault();
            elemLast?.focus();
        }
    };
    // When the last item selected, tab pressed, jump to the first selectable item.
    const onLastElemKeydown = (e) => {
        if (!e.shiftKey && e.code === 'Tab') {
            e.preventDefault();
            elemFirst?.focus();
        }
    };
    // Sort focusable elements by tabindex, positive first, then 0
    const sortByTabIndex = (focusableElems) => {
        return focusableElems
            .filter((elem) => elem.tabIndex >= 0)
            .sort((a, b) => {
            if (a.tabIndex === 0 && b.tabIndex > 0) {
                return 1; // Move 0 to end of array
            }
            else if (a.tabIndex > 0 && b.tabIndex === 0) {
                return -1; // Move 0 to end of array
            }
            else
                return a.tabIndex - b.tabIndex; // Sort non-zero values in ascending order
        });
    };
    // Get element with smallest focusindex value, or first focusable element
    const getFocusTrapTarget = (elemFirst) => {
        // Get elements with data-focusindex attribute
        const focusindexElements = [...element.querySelectorAll('[data-focusindex]')];
        if (focusindexElements.length === 0)
            return elemFirst;
        // return smallest focusindex element or elemFirst
        return (
        // eslint-disable-next-line sonarjs/no-misleading-array-reverse
        focusindexElements.sort((a, b) => {
            return +a.dataset.focusindex - +b.dataset.focusindex;
        })[0] || elemFirst);
    };
    const onScanElements = (fromObserver) => {
        if (!enabled)
            return;
        // Gather all focusable elements, sorted according to tabindex
        // @ts-expect-error Hmmm
        const focusableElems = sortByTabIndex([...element.querySelectorAll(elemWhitelist)]);
        if (focusableElems.length > 0) {
            // Set first/last focusable elements
            elemFirst = focusableElems[0];
            elemLast = focusableElems.at(-1);
            // Auto-focus focusTrapTarget or first focusable element only when not called from observer
            if (!fromObserver)
                getFocusTrapTarget(elemFirst).focus();
            // Listen for keydown on first & last element
            elemFirst.addEventListener('keydown', onFirstElemKeydown);
            elemLast?.addEventListener('keydown', onLastElemKeydown);
        }
    };
    onScanElements(false);
    const onCleanUp = () => {
        if (elemFirst)
            elemFirst.removeEventListener('keydown', onFirstElemKeydown);
        if (elemLast)
            elemLast.removeEventListener('keydown', onLastElemKeydown);
    };
    // When children of node are changed (added or removed)
    const onObservationChange = (mutationRecords, observer) => {
        if (mutationRecords.length > 0) {
            onCleanUp();
            onScanElements(true);
        }
        return observer;
    };
    const observer = new MutationObserver(onObservationChange);
    observer.observe(element, { childList: true, subtree: true });
    return {
        update(newArgs) {
            enabled = newArgs;
            if (newArgs)
                onScanElements(false);
            else
                onCleanUp();
        },
        destroy() {
            onCleanUp();
            observer.disconnect();
        }
    };
};
