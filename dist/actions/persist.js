/* eslint-disable */
import { localStore } from '../stores/index.js';
/**
 * Persist all child form elements.
 * adapted from: https://github.com/fawaz-alesayi/svelte-use-persist
 * @param element HTML element to attach to.
 * @param config Persist config.
 */
export function persist(element, config) {
    const _config = {
        persistOn: 'input',
        ignorePassword: true,
        clearOnSubmit: true,
        storage: 'local',
        ...config
    };
    let _store;
    _store = 'key' in _config
        ? localStore.create(_config.key, {})
        : _config.store;
    const handler = (event) => {
        save_input(event, _store, {
            ignorePassword: _config.ignorePassword
        });
    };
    const clearLocalStorage = (_) => {
        if (_config.clearOnSubmit) {
            _store.set({});
        }
    };
    load_cached_values(element, _store, {
        ignorePassword: _config.ignorePassword
    });
    element.addEventListener(_config.persistOn, handler);
    element.addEventListener('submit', clearLocalStorage);
    element.addEventListener('reset', clearLocalStorage);
    return {
        destroy() {
            element.removeEventListener(_config.persistOn, handler);
            element.removeEventListener('submit', clearLocalStorage);
            element.removeEventListener('reset', clearLocalStorage);
        }
    };
}
const save_input = (event, store, config) => {
    const input = event.target;
    const value = store.get;
    if (input instanceof HTMLSelectElement) {
        store.set({ ...value, [input.name]: input.selectedIndex });
    }
    else if (input instanceof HTMLInputElement) {
        if (input.type === 'password' && config.ignorePassword) { }
        else if (input.type === 'checkbox') {
            store.set({ ...value, [input.name]: input.checked ? input.value : null });
        }
        else if (input.type === 'radio') {
            if (input.checked) {
                store.set({ ...value, [input.name]: input.value });
            }
        }
        else {
            store.set({ ...value, [input.name]: input.value });
        }
    }
    else if (input instanceof HTMLTextAreaElement) {
        store.set({ ...value, [input.name]: input.value });
    }
};
const load_cached_values = (element, store, config) => {
    for (const [key, value] of Object.entries(store.get)) {
        if (element.attributes.getNamedItem('name')?.value === key) {
            load_data(element, value, config);
        }
        const inputs = element.querySelectorAll(`[name="${key}"]`);
        for (const input of inputs) {
            load_data(input, value, config);
        }
    }
};
const load_data = (element, value, config) => {
    if (element instanceof HTMLInputElement) {
        if (element.type === 'radio' || element.type === 'checkbox') {
            if (element.value === value) {
                element.checked = true;
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
        else if (element.type === 'password' && !config.ignorePassword) {
            element.value = value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
        else {
            element.value = value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    else if (element instanceof HTMLTextAreaElement) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
    }
    else if (element instanceof HTMLSelectElement) {
        element.selectedIndex = value;
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }
};
