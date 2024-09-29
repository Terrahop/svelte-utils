import type { Updater } from 'svelte/store'

export interface StateRune<T> {
  get: T
  set: (value: T) => void
  update: (updater: Updater<T>) => void
}

export type SvelteEvent<E extends Event = Event, T extends EventTarget = Element> = E & { currentTarget: EventTarget & T }
