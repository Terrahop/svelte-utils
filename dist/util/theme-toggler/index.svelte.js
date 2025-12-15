import { localStore } from '../../stores/local-store.svelte.js';
const Theme = () => {
    const current = localStore.create('theme');
    let darkTheme = $state('');
    let lightTheme = $state('');
    let viewTransition = $state(false);
    const isDark = $derived(current.get === darkTheme);
    return {
        get value() {
            return current.get;
        },
        get viewTransition() {
            return viewTransition;
        },
        set viewTransition(v) {
            viewTransition = v;
        },
        get isDark() {
            return isDark;
        },
        setDark: (v) => {
            darkTheme = v;
        },
        setLight: (v) => {
            lightTheme = v;
        },
        toggle() {
            const c = current.get;
            if (c === darkTheme)
                current.get = lightTheme;
            else if (c === lightTheme)
                current.get = darkTheme;
            else
                current.get = darkTheme;
        },
        set(theme) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (viewTransition && document.startViewTransition) {
                document.startViewTransition(() => {
                    current.get = theme;
                });
            }
            else {
                current.get = theme;
            }
        }
    };
};
export const theme = Theme();
