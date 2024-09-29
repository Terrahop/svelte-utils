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
