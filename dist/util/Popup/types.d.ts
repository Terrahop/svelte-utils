type Direction = 'top' | 'bottom' | 'left' | 'right';
export type Placement = Direction | `${Direction}-start` | `${Direction}-end`;
export interface Middleware {
    offset?: number | Record<string, any>;
    shift?: Record<string, any>;
    flip?: Record<string, any>;
    arrow?: {
        element: string;
    } & Record<string, any>;
    size?: Record<string, any>;
    autoPlacement?: Record<string, any>;
    hide?: Record<string, any>;
    inline?: Record<string, any>;
}
export interface PopupSettings {
    event: 'click' | 'hover' | 'focus-blur' | 'focus-click';
    target: string;
    outsideClose?: boolean;
    placement?: Placement;
    closeQuery?: string;
    state?: (event: {
        state: boolean;
    }) => void;
    middleware?: Middleware;
}
export {};
