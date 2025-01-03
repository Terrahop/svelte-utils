import type { ActionReturn } from 'svelte/action'

const preventScrollFunc = (e: WheelEvent) => {
  e.preventDefault()
}

/**
 * A svelte action to prevent scroll behaviour on target element
 * @param node - HTML element to attach to.
 * @param enabled - .
 * @example ```svelte
 * <div use:preventScroll /> 
 * <!-- Disabled -->
 * <div use:preventScroll={false} /> 
 * ```
 */
export const preventScroll = (node: HTMLElement, enabled = true): ActionReturn<boolean> => {
  if (enabled) node.addEventListener('wheel', preventScrollFunc)

  return {
    update(enabledd) {
      enabled = enabledd
    },
    destroy() {
      node.removeEventListener('wheel', preventScrollFunc)
    }
  }
}
