import { createState } from "../../stores/helpers.svelte";
export const toasts = createState([]);
const trigger = ({ title = '', message = '', duration, closable = true, type = 'success', action, actionText }) => {
    const id = Math.random().toString();
    duration = type === 'error' ? duration ?? 5000 : duration ?? 4000;
    toasts.update((v) => [
        ...v,
        {
            id,
            title,
            message,
            type,
            duration,
            closable,
            action,
            actionText
        }
    ]);
    return id;
};
export const toast = {
    clear: () => {
        toasts.set([]);
    },
    trigger,
    close: (id) => {
        toasts.update((toasts) => {
            return toasts.filter((toast) => toast.id !== id);
        });
    }
};
