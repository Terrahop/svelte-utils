import type { HTMLInputAttributes } from 'svelte/elements';
export type { ModalStore } from './modal.svelte.ts';
export interface ModalComponent {
    ref: any;
    props?: Record<string, unknown>;
    slot?: string;
}
export interface ModalSettings {
    type: 'alert' | 'confirm' | 'prompt' | 'component';
    position?: string;
    title?: string;
    body?: string;
    image?: string;
    value?: unknown;
    valueAttr?: HTMLInputAttributes;
    component?: ModalComponent | string;
    response?: (r?: any) => void;
    backdropClasses?: string;
    modalClasses?: string;
    buttonTextCancel?: string;
    buttonTextConfirm?: string;
    buttonTextSubmit?: string;
    meta?: any;
}
