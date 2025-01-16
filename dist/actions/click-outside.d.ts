export declare function clickOutside(element: HTMLElement, callback: (event: MouseEvent) => void): {
    update: (newCallback: (event: MouseEvent) => void) => void;
    destroy: () => void;
};
