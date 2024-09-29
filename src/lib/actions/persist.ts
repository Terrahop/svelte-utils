/* eslint-disable */
import { localStore } from '../stores/index.js'
import type { StateRune } from '../types.js'

interface BasePersistConfig {
  /**
   * The event to listen to for persisting the form state.
   * @default 'input'
   */
  persistOn?: 'input' | 'change' | 'blur'

  /**
   * Setting this to `false` will cause the password fields to be persisted. Highly discouraged.
   *
   * This is a massive security risk, only use this if you know what you are doing.
   * @default true
   */
  ignorePassword?: boolean

  /**
   * Clear local storage that is associated with the element when the form is submitted.
   * @default true
   */
  clearOnSubmit?: boolean
}

type PersistConfigWithKey = BasePersistConfig & {
  key: string

  /**
   * The storage to use for persisting the form state. (local, session).
   * @default 'local'
   */
  storage?: 'local' | 'session'
}

type PersistConfigWithStore = BasePersistConfig & {
  store: StateRune<any>
}
type PersistConfig = PersistConfigWithKey | PersistConfigWithStore

/**
 * Persist all child form elements.
 * adapted from: https://github.com/fawaz-alesayi/svelte-use-persist
 * @param element HTML element to attach to.
 * @param config Persist config.
 */
export function persist(element: HTMLElement, config: PersistConfig) {
  const _config = {
    persistOn: 'input',
    ignorePassword: true,
    clearOnSubmit: true,
    storage: 'local',
    ...config
  } as const

  let _store: StateRune<any>
  _store = 'key' in _config
    ? localStore.create(
      _config.key,
      {}
    )
    : _config.store

  const handler = (event: Event) => {
    save_input(event, _store, {
      ignorePassword: _config.ignorePassword
    })
  }

  const clearLocalStorage = (_: Event) => {
    if (_config.clearOnSubmit) {
      _store.set({})
    }
  }

  load_cached_values(element, _store, {
    ignorePassword: _config.ignorePassword
  })

  element.addEventListener(_config.persistOn, handler)
  element.addEventListener('submit', clearLocalStorage)
  element.addEventListener('reset', clearLocalStorage)

  return {
    destroy() {
      element.removeEventListener(_config.persistOn, handler)
      element.removeEventListener('submit', clearLocalStorage)
      element.removeEventListener('reset', clearLocalStorage)
    }
  }
}

const save_input = (
  event: Event,
  store: StateRune<any>,
  config: {
    ignorePassword: boolean
  }
) => {
  const input = event.target
  const value = store.get
  if (input instanceof HTMLSelectElement) {
    store.set({ ...value, [input.name]: input.selectedIndex })
  } else if (input instanceof HTMLInputElement) {
    if (input.type === 'password' && config.ignorePassword) { } else if (input.type === 'checkbox') {
      store.set({ ...value, [input.name]: input.checked ? input.value : null })
    } else if (input.type === 'radio') {
      if (input.checked) {
        store.set({ ...value, [input.name]: input.value })
      }
    } else {
      store.set({ ...value, [input.name]: input.value })
    }
  } else if (input instanceof HTMLTextAreaElement) {
    store.set({ ...value, [input.name]: input.value })
  }
}

const load_cached_values = (
  element: HTMLElement,
  store: StateRune<any>,
  config: {
    ignorePassword: boolean
  }
) => {
  for (const [key, value] of Object.entries(store.get)) {
    if (element.attributes.getNamedItem('name')?.value === key) {
      load_data(element, value, config)
    }
    const inputs = element.querySelectorAll(`[name="${key}"]`)
    for (const input of inputs) {
      load_data(input, value, config)
    }
  }
}

const load_data = (element: Element, value: unknown, config: { ignorePassword: boolean }) => {
  if (element instanceof HTMLInputElement) {
    if (element.type === 'radio' || element.type === 'checkbox') {
      if (element.value === value) {
        element.checked = true
        element.dispatchEvent(new Event('change', { bubbles: true }))
      }
    } else if (element.type === 'password' && !config.ignorePassword) {
      element.value = value as string
      element.dispatchEvent(new Event('input', { bubbles: true }))
    } else {
      element.value = value as string
      element.dispatchEvent(new Event('input', { bubbles: true }))
    }
  } else if (element instanceof HTMLTextAreaElement) {
    element.value = value as string
    element.dispatchEvent(new Event('input', { bubbles: true }))
  } else if (element instanceof HTMLSelectElement) {
    element.selectedIndex = value as number
    element.dispatchEvent(new Event('change', { bubbles: true }))
  }
}
