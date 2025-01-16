import { getContext, setContext } from 'svelte'
import type { PopupSettings } from './actions/popup.js'
import merge from 'lodash.merge'

const defaultsKey = Symbol('defaults')

type ExtractMerge<T extends string> = T extends `${string}Merge` ? T : never

/**
 * Default Element values. Most defaults have a 'merge' value which, when used,
 * will merge that class value with the individual elements class value, otherwise if the
 * regular value is used it will be replaced by the individual elements class value.
 */
export interface Defaults {
  popup?: {
    /** Style the root toggle wrapper element. */
    class?: string
    classMerge?: string
    /** Style the popup content element. */
    cContent?: string
    cContentMerge?: string
    /** Style the root popup element. Preferrably style `cContent` if possible. */
    cPopup?: string
    cPopupMerge?: string
    /**
     * Should the popup container be set to hidden when closed.
     * @default false
     */
    closeHidden?: boolean
    /**
     * Popup z index.
     * @default 'z-20'
     */
    cZ?: string
  }
  popupSettings?: Omit<PopupSettings, 'state' | 'middleware'>
}

export type DefaultPopup = Omit<NonNullable<Defaults['popup']>, ExtractMerge<keyof NonNullable<Defaults['popup']>>>

export const setDefaults = (value: Defaults) => {
  const current = getDefaults() as Defaults | undefined
  setContext<Defaults>(defaultsKey, current ? merge(current, [value]) : value)
}

export const getDefaults = () => {
  return getContext<Defaults>(defaultsKey)
}