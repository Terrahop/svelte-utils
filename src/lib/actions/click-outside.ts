import type { Action } from 'svelte/action'

interface Args {
  /** Called when clicked outside. */
  cb: (event: MouseEvent) => void
  /** Use mousedown event instead of click event. */
  mousedown?: boolean
}

/**
 * A svelte action to handle clicking off a component to toggle it(dropdowns, modals, sidebars etc).
 * @param element - HTML element to use to determine whether clicked outside.
 * @param args - Args.
 * @example ```svelte
 * <div use:clickOutside={{ cb: () => console.log('Mousedown outside!'), mousedown: true }} />
 * <div use:clickOutside={cb: () => console.log('Clicked outside!')} />
 * ```
 */
export const clickOutside: Action<HTMLElement, Args | ((event: MouseEvent) => void)> = (element, args) => {
  let cb: Args['cb']
  let mousedown: Args['mousedown']

  const setArgs = () => {
    cb = typeof args === 'object' ? args.cb : args
    mousedown = typeof args === 'object' ? args.mousedown : undefined
  }

  const clickHandler = (event: MouseEvent) => {
    if (!element.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      cb(event)
    }
  }

  const removeHandler = () => {
    document.body.removeEventListener(mousedown ? 'mousedown' : 'click', clickHandler, true)
  }

  const setHandler = () => {
    removeHandler()

    // Use a delay to prevent the click setting states too quickly.
    setTimeout(() => {
      document.body.addEventListener(mousedown ? 'mousedown' : 'click', clickHandler, true)
    }, 50)
  }

  setArgs()
  setHandler()

  return {
    update(newCallbackFunction) {
      args = newCallbackFunction
      setArgs()
      setHandler()
    },
    destroy() {
      removeHandler()
    }
  }
}
