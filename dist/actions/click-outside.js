export function clickOutside(element, callbackFunction) {
    const onClick = (event) => {
        if (!element.contains(event.target) && !event.defaultPrevented) {
            callbackFunction(event);
        }
    };
    setTimeout(() => {
        document.body.addEventListener('click', onClick, true);
    }, 50);
    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick, true);
        }
    };
}
