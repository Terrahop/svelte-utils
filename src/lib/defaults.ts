import { getContext, setContext } from 'svelte'
import type { PopupSettings } from './actions/popup.js'

const defaultsKey = Symbol('defaults')

type ExtractMerge<T extends string> = T extends `${string}Merge` ? T : never

/**
 * Default Element values. Most css defaults ('class' or prefixed with 'c') have a
 * merge value (suffixed with 'Merge') which, when used, will merge that class value with the
 * elements class value, otherwise if the regular value is used it will be replaced
 * by the elements class value.
 */
export interface Defaults {
  tooltip?: {
    /** Style the root toggle wrapper element. */
    class?: string
    classMerge?: string
    /** @default 'rounded-box border border-light bg-base-100 px-4 py-2 drop-shadow-md' */
    cContent?: string
    cContentMerge?: string
    /** @default 'z-10' */
    cZ?: string
  }
  popup?: {
    /** Style the root toggle wrapper element. */
    class?: string
    classMerge?: string
    /**
     * Style the popup content element.
     * @default 'rounded-box border border-light bg-base-100 p-sm shadow-lg'
     */
    cContent?: string
    cContentMerge?: string
    /** Style the root popup element. Preferrably style `cContent` if possible. */
    cPopup?: string
    cPopupMerge?: string
    /** @default 'z-10' */
    cZ?: string
  }
  popupSettings?: Omit<PopupSettings, 'state' | 'middleware'>
}

export type DefaultPopup = Omit<NonNullable<Defaults['popup']>, ExtractMerge<keyof NonNullable<Defaults['popup']>>>
export type DefaultTooltip = Omit<NonNullable<Defaults['tooltip']>, ExtractMerge<keyof NonNullable<Defaults['tooltip']>>>

export const setDefaults = (value: Defaults) => {
  setContext<Defaults>(defaultsKey, value)
}

export const getDefaults = () => {
  return getContext<Defaults | undefined>(defaultsKey) ?? {}
}
