// eslint-disable-next-line unicorn/prefer-global-this -- Necessary
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
// eslint-disable-next-line sonarjs/pseudo-random -- Its safe
export const random = () => Math.random().toString();
