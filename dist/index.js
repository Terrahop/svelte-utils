import { setContext } from 'svelte';
const defaultsKey = Symbol('defaults');
export const setDefaults = (value) => {
    setContext(defaultsKey, value);
};
export const getDefaults = (value) => {
    setContext(defaultsKey, value);
};
export * from './util/index.js';
export * from './actions/index.js';
export * from './stores/index.js';
export * from './components/index.js';
