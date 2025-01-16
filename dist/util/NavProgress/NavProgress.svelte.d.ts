interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const NavProgress: $$__sveltets_2_IsomorphicComponent<{
    intervalTime?: number;
    stepSizes?: number[];
    displayThresholdMs?: number;
    noNavigationProgress?: boolean;
    id: string | undefined;
    busy?: boolean;
    color?: string;
    class?: `text-${string}` | "";
    zIndex?: number;
    minimum?: number;
    maximum?: number;
    settleTime?: number;
    reset?: (minimum?: number) => void;
    animate?: () => void;
    start?: (minimum?: number) => void;
    stop?: () => void;
    complete?: (settleTime?: number) => void;
    setWidthRatio?: (widthRatio: number) => void;
    getState?: () => {
        width: number;
        running: boolean;
        completed: boolean;
        color: string;
        defaultMinimum: number;
        maximum: number;
        defaultSettleTime: number;
        intervalTime: number;
        stepSizes: number[];
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    reset: (minimum?: number) => void;
    animate: () => void;
    start: (minimum?: number) => void;
    stop: () => void;
    complete: (settleTime?: number) => void;
    setWidthRatio: (widthRatio: number) => void;
    getState: () => {
        width: number;
        running: boolean;
        completed: boolean;
        color: string;
        defaultMinimum: number;
        maximum: number;
        defaultSettleTime: number;
        intervalTime: number;
        stepSizes: number[];
    };
}, string>;
type NavProgress = InstanceType<typeof NavProgress>;
export default NavProgress;
