import type { Updater } from "svelte/store"

/**
 * Create a simple svelte $state rune with a getter, setter and updater.
 * @param initial - Optional initial value.
 * @returns Svelte state getter and setter.
 */
export const createState = <T>(initial?: T) => {
  let state = $state<T>(initial as T)
  return {
    get get() { return state },
    set get(value: T) { state = value },
    set: (instance: T) => (state = instance),
    update(updater: Updater<T>) {
      state = updater(state)
    }
  }
}
