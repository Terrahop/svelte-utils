export declare const clickCopy: (element: HTMLElement, params?: {
    target?: string;
    onCopy?: (v: string) => void;
}) => {
    update: (opts: {
        target?: string;
        callback?: () => void;
    }) => void;
    destroy: () => void;
};
