export const shortcut = (element, params) => {
    let handler;
    const removeHandler = () => {
        globalThis.removeEventListener('keydown', handler);
    };
    const setHandler = () => {
        removeHandler();
        handler = (e) => {
            if ((!!params.alt !== e.altKey)
                || (!!params.shift !== e.shiftKey)
                || (!!params.control !== (e.ctrlKey || e.metaKey))
                || params.key !== e.key) {
                return;
            }
            e.preventDefault();
            if (params.callback) {
                params.callback();
            }
            else {
                element.click();
            }
        };
        globalThis.addEventListener('keydown', handler);
    };
    setHandler();
    return {
        update: setHandler,
        destroy: removeHandler
    };
};
