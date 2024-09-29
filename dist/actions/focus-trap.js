export const focusTrap = (element, enabled) => {
    const elemWhitelist = 'a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), textarea:not([tabindex="-1"]), select:not([tabindex="-1"]), details:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';
    let elemFirst;
    let elemLast;
    const onFirstElemKeydown = (e) => {
        if (e.shiftKey && e.code === 'Tab') {
            e.preventDefault();
            elemLast.focus();
        }
    };
    function onLastElemKeydown(e) {
        if (!e.shiftKey && e.code === 'Tab') {
            e.preventDefault();
            elemFirst.focus();
        }
    }
    const sortByTabIndex = (focusableElems) => {
        return focusableElems
            .filter((elem) => elem.tabIndex >= 0)
            .sort((a, b) => {
            if (a.tabIndex === 0 && b.tabIndex > 0) {
                return 1;
            }
            else if (a.tabIndex > 0 && b.tabIndex === 0) {
                return -1;
            }
            else
                return a.tabIndex - b.tabIndex;
        });
    };
    const getFocusTrapTarget = (elemFirst) => {
        const focusindexElements = [...element.querySelectorAll('[data-focusindex]')];
        if (!focusindexElements || focusindexElements.length === 0)
            return elemFirst;
        return (focusindexElements.sort((a, b) => {
            return +a.dataset.focusindex - +b.dataset.focusindex;
        })[0] || elemFirst);
    };
    const onScanElements = (fromObserver) => {
        if (!enabled)
            return;
        const focusableElems = sortByTabIndex([...element.querySelectorAll(elemWhitelist)]);
        if (focusableElems.length > 0) {
            elemFirst = focusableElems[0];
            elemLast = focusableElems.at(-1);
            if (!fromObserver)
                getFocusTrapTarget(elemFirst).focus();
            elemFirst.addEventListener('keydown', onFirstElemKeydown);
            elemLast.addEventListener('keydown', onLastElemKeydown);
        }
    };
    onScanElements(false);
    const onCleanUp = () => {
        if (elemFirst)
            elemFirst.removeEventListener('keydown', onFirstElemKeydown);
        if (elemLast)
            elemLast.removeEventListener('keydown', onLastElemKeydown);
    };
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
