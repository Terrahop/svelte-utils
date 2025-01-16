export interface ToastItem {
    id: string;
    /** Toast title. */
    title?: string;
    /** Toast message. */
    message?: string;
    /**
     * Toast type.
     * @default 'success'.
     */
    type: 'info' | 'success' | 'error' | 'warning' | 'primary';
    /**
     * Duration to display the toast in ms, set to 0 to disable auto closing.
     * @default 4000, 5000 if type is error
     */
    duration?: number;
    /**
     * Should the toast be closable?
     * @default true
     */
    closable: boolean;
    /** Custom action. Will render a button to trigger this action. */
    action?: (toastId: string) => void;
    /** Custom action button text. */
    actionText?: string;
}
/** Keep track of all toasts. */
export declare const toasts: import("../../types").StateRune<ToastItem[]>;
export declare const toast: {
    clear: () => void;
    trigger: ({ title, message, duration, closable, type, action, actionText }: Partial<Omit<ToastItem, "id">>) => string;
    close: (id: string) => void;
};
