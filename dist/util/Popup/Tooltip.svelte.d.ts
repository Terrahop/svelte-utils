import type { PopupSettings } from '../../index.js';
import type { Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import { type DefaultTooltip } from '../../defaults.js';
interface Props extends Pick<PopupSettings, 'placement'>, DefaultTooltip {
    children: Snippet;
    content?: string;
    offset?: number;
    placement?: Placement;
}
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
