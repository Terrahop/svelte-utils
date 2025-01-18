import type { PopupSettings } from '../../index.js';
import type { Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import { type DefaultTooltip } from '../../defaults.js';
declare const Tooltip: import("svelte").Component<Pick<PopupSettings, "placement"> & DefaultTooltip & {
    children: Snippet;
    content?: string;
    offset?: number;
    placement?: Placement;
}, {}, "">;
export default Tooltip;
