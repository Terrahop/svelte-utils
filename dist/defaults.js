import { getContext, setContext } from 'svelte';
const defaultsKey = Symbol('defaults');
export const setDefaults = (value) => {
    setContext(defaultsKey, value);
};
export const getDefaults = () => {
    return getContext(defaultsKey) ?? {};
};
