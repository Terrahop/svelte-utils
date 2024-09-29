interface ShortcutParams {
    alt?: boolean;
    shift?: boolean;
    control?: boolean;
    callback?: () => void;
    key?: KeyboardEvent['key'];
}
export declare const shortcut: (element: HTMLElement, params: ShortcutParams) => {
    update: () => void;
    destroy: () => void;
};
export {};
