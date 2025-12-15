interface Props {
    /** Will be set to true when the progress bar is running. */
    busy?: boolean;
    /**
     * The CSS color to use to style the progress bar.
     *
     * If you're using Tailwind or Windi CSS, leave this to the default
     * and set the `class` attribute to a `text-` class instead.
     * @default 'currentColor'
     */
    color?: string;
    /**
     * When navigating, this is the threshold duration in milliseconds
     * that the progress bar will wait before showing.
     *
     * This means that if the navigation takes less than this amount of time,
     * the progress bar will not be shown. This is to prevent the progress bar
     * from flashing in and out on the screen.
     * @default 150 ms
     */
    displayThresholdMs?: number;
    /**
     * If set, an ID for the progress bar on the HTML page.
     * This ID must be unique on the page to avoid conflicts.
     *
     * Might be used with another element to signal to assistive technologies that
     * progress is ongoing.
     * @example
     * <ProgressBar id="my-progress-bar" bind:busy />
     * <div aria-busy={busy} aria-describedby="my-progress-bar">
     *  A div that is currently loading...
     * </div>
     */
    id?: string;
    /**
     * Milliseconds to wait between incrementing bar width when using
     * the `start` (auto-increment) method.
     * @default 700
     */
    intervalTime?: number;
    /**
     * The maximum percent width value to use when the bar is at the end but not marked as complete.
     * Letting the bar stay at 100% width for a while doesn't usually look very good either.
     * @default 0.994
     */
    maximum?: number;
    /**
     * The starting percent width use when the bar starts.
     * Starting at 0 doesn't usually look very good.
     * @default 0.08
     */
    minimum?: number;
    /** Set to `true` to disable the showing of the progress bar on navigation. */
    noNavigationProgress?: boolean;
    /** @default [0, 0.005, 0.01, 0.02] */
    stepSizes?: number[];
    /**
     * Milliseconds to wait after the complete method is called to hide the progress bar.
     * Letting it sit at 100% width for a very short time makes it feel more fluid.
     * @default 700
     */
    settleTime?: number;
    /**
     * The `z-index` CSS property value to use for the progress bar.
     * Be aware that the glowing effect on the bar will use this `zIndex` + 1.
     * @default 1
     */
    zIndex?: number;
    /**
     * A Tailwind `text-` class to use to color the Progress Bar.
     *
     * This prop will be ignored if the `color` prop is set to something other than `currentColor`.
     *
     * **WARNING**: Do not set this prop with something other than a `text-` class,
     * as it could interfere with the styling of the Progress Bar.
     * @example text-green-500
     */
    class?: string;
}
/**
 * A Progress Bar that hooks to SvelteKit navigation.
 *
 * The progress bar will show during navigation if loading takes more than `displayThresholdMs`
 * and will hide when navigation is complete.
 *
 * original: https://github.com/saibotsivad/svelte-progress-bar
 * adapted: https://github.com/prgm-dev/sveltekit-progress-bar
 * this version: improved some types, converted to svelte 5 runes, added more docs and refactors styles so they can be optmized by svelte.
 * @author https://github.com/terrahop
 */
declare const NavProgress: import("svelte").Component<Props, {
    /**
       * Reset the progress bar back to the beginning, leaving it in a running state.
       * @param minimumL - Progress value to start at.
       */ reset: (minimumL?: number) => void;
    /**
       * Continue the animation of the progress bar from whatever position it is in, using
       * a randomized step size to increment.
       */ animate: () => void;
    /**
       * Restart the bar at the minimum, and begin the auto-increment progress.
       * @param minimum - Progress value to start at.
       */ start: (minimum?: number) => void;
    /** Stop the progress bar from incrementing, but leave it visible. */ stop: () => void;
    /**
       * Moves the progress bar to the fully completed position, wait an appropriate
       * amount of time so the user can feel the completion, then hide and reset.
       * @param settleTimeL - Time to wait before hiding.
       */ complete: (settleTimeL?: number) => void;
    /**
       * Stop the auto-increment functionality and manually set the width of the progress bar.
       * @param widthRatio - Width to use.
       */ setWidthRatio: (widthRatio: number) => void;
    getState: () => {
        width: number;
        running: boolean;
        completed: boolean;
        color: string;
        minimum: number;
        maximum: number;
        settleTime: number;
        intervalTime: number;
        stepSizes: number[];
    };
}, "busy">;
type NavProgress = ReturnType<typeof NavProgress>;
export default NavProgress;
