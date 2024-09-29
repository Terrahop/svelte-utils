export interface ToastItem {
    id: string;
    title?: string;
    message?: string;
    type: 'info' | 'success' | 'error' | 'warning' | 'primary';
    duration?: number;
    closable: boolean;
    action?: (toastId: string) => void;
    actionText?: string;
}
export declare const toasts: {
    get: ToastItem[];
    set: (instance: ToastItem[]) => ToastItem[];
    update(updater: import("svelte/store").Updater<ToastItem[]>): void;
};
export declare const toast: {
    clear: () => void;
    trigger: ({ title, message, duration, closable, type, action, actionText }: Partial<Omit<ToastItem, "id">>) => string;
    close: (id: string) => void;
};
