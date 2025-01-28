interface Props {
    /** Dot color. @default "bg-secondary-500". */
    color?: string;
    /** Dot position. @default "indicator-top indicator-end". */
    position?: string;
    class?: string;
}
/**
 * Renders a small pulsing notification dot to indicate activity or draw attention, should be used sparingly.
 * Parent element must be relatively positioned to work.
 * @example svelte```
 * <div class="relative">
 * <Ping/>
 * </div>
 * ```
 */
declare const Ping: import("svelte").Component<Props, {}, "">;
type Ping = ReturnType<typeof Ping>;
export default Ping;
