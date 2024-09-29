export declare function clickOutside(element: HTMLElement, callbackFunction: CallableFunction): {
    update: (newCallbackFunction: CallableFunction) => void;
    destroy: () => void;
};
