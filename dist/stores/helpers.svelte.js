/**
 * Create a simple svelte $state rune with a getter, setter and updater.
 * @param initial - Optional initial value.
 * @returns Svelte state getter and setter.
 */
export const createState = (initial) => {
    let state = $state(initial);
    return {
        get get() { return state; },
        set get(value) { state = value; },
        set: (instance) => (state = instance),
        update(updater) {
            state = updater(state);
        }
    };
};
