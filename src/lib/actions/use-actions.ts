/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */

// https://github.com/hperrin/svelte-material-ui/blob/19ea8edba225a22fbfbeeb76030a0d0f9ee1f8e5/packages/common/src/internal/useActions.ts#L28

export type SvelteActionReturnType<P> = {
  update?: (newParams?: P) => void
  destroy?: () => void
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
} | void

export type SvelteHTMLActionType<P> = (
  node: HTMLElement,
  params?: P,
) => SvelteActionReturnType<P>

export type HTMLActionEntry<P = any> =
  | SvelteHTMLActionType<P>
  | [SvelteHTMLActionType<P>, P]

export type HTMLActionArray = HTMLActionEntry[]

export type SvelteSVGActionType<P> = (
  node: SVGElement,
  params?: P,
) => SvelteActionReturnType<P>

export type SVGActionEntry<P = any> =
  | SvelteSVGActionType<P>
  | [SvelteSVGActionType<P>, P]

export type SVGActionArray = SVGActionEntry[]

export type ActionArray = HTMLActionArray | SVGActionArray

export const useActions = (
  node: HTMLElement | SVGElement,
  actions?: ActionArray
) => {
  const actionReturns: Array<SvelteActionReturnType<any>> = []

  if (actions) {
    for (const actionEntry of actions) {
      const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry
      if (Array.isArray(actionEntry) && actionEntry.length > 1) {
        actionReturns.push(
          action(node as HTMLElement & SVGElement, actionEntry[1])
        )
      } else {
        actionReturns.push(action(node as HTMLElement & SVGElement))
      }
    }
  }

  return {
    update(actions?: ActionArray) {
      if (((actions?.length) ?? 0) !== actionReturns.length) {
        throw new Error('You must not change the length of an actions array.')
      }

      if (actions) {
        for (const [i, actionEntry] of actions.entries()) {
          const returnEntry = actionReturns[i]
          if (returnEntry && returnEntry.update) {
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
              returnEntry.update(actionEntry[1])
            } else {
              returnEntry.update()
            }
          }
        }
      }
    },

    destroy() {
      for (const returnEntry of actionReturns) {
        if (returnEntry && returnEntry.destroy) {
          returnEntry.destroy()
        }
      }
    }
  }
}
