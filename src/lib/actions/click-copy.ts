/* eslint-disable @typescript-eslint/no-misused-promises */
/**
 * A svelte action to copy text of a clicked element to the clipboard.
 * @param element - HTML element to attach to.
 * @param params - Optional action params.
 * @param params.target - Optionally provide a target element query selector to get the text content from.
 * @param params.onCopy - Optionally provide the callback if text is successfully copied.
 * @returns Svelte destroy callback for binding to Svelte's 'use' directive.
 * @example ```svelte
 * <div use:clickCopy={{target: '#myelement', onCopy: (v) => console.log(v) }} />
 * ```
 */
export const clickCopy = (element: HTMLElement, params?: { target?: string, onCopy?: (v: string) => void }): {
  update: (opts: { target?: string, callback?: () => void }) => void
  destroy: () => void
} => {
  element.classList.add('cursor-copy')

  const copyText = async (event: MouseEvent) => {
    if (event.detail === 2) return

    const text = params?.target
      ? document.querySelector(params.target)?.textContent
      : element.textContent

    try {
      if (text) {
        await navigator.clipboard.writeText(text)
        params?.onCopy?.(text)
      }

      element.dispatchEvent(
        new CustomEvent('copysuccess', {
          bubbles: true
        })
      )
    } catch (error) {
      element.dispatchEvent(
        new CustomEvent('copyerror', {
          bubbles: true,
          detail: error
        })
      )
    }
  }

  element.addEventListener('click', copyText)

  return {
    update(newOpts) {
      params = newOpts
    },
    destroy() {
      element.removeEventListener('click', copyText)
    }
  }
}
