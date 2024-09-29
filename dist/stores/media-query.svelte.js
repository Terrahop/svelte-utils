import { isBrowser } from '../helpers.js';
import { readable } from 'svelte/store';
const useMediaQuery = (query) => {
    if (!isBrowser) {
        return false;
    }
    const matchedQuery = window.matchMedia(query);
    let state = $state(matchedQuery.matches);
    const handleChange = (e) => {
        state = e.matches;
    };
    matchedQuery.addEventListener('change', handleChange);
    return state;
};
export const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
export const breakpoint = {
    get xs() { return useMediaQuery('(min-width: 480px)'); },
    get sm() { return useMediaQuery('(min-width: 640px)'); },
    get md() { return useMediaQuery('(min-width: 768px)'); },
    get lg() { return useMediaQuery('(min-width: 1024px)'); },
    get xl() { return useMediaQuery('(min-width: 1280px)'); },
    get xxl() { return useMediaQuery('(min-width: 1440px)'); }
};
const prefersReducedMotionMatcher = () => {
    if (!isBrowser)
        return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
export const prefersReducedMotion = readable(prefersReducedMotionMatcher(), (set) => {
    if (isBrowser) {
        const setReducedMotion = (event) => {
            set(event.matches);
        };
        const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQueryList.addEventListener('change', setReducedMotion);
        return () => {
            mediaQueryList.removeEventListener('change', setReducedMotion);
        };
    }
    else {
        return;
    }
});
