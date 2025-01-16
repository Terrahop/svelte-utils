export function clickOutside(element, callback) {
    const onClick = (event) => {
        if (!element.contains(event.target) && !event.defaultPrevented) {
            callback(event);
        }
    };
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
