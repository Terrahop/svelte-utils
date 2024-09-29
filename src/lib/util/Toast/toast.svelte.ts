import { createState } from "../../stores/helpers.svelte"

export interface ToastItem {
  id: string
  /** Toast title. */
  title?: string
  /** Toast message. */
  message?: string
  /** Toast type. @default 'success' */
  type: 'info' | 'success' | 'error' | 'warning' | 'primary'
  /**
   * Duration to display the toast in ms, set to 0 to disable auto closing.
   * @default 4000, 5000 if type is error
   */
  duration?: number // Duration in ms;
  /**
   * Should the toast be closable?
   * @default true
   */
  closable: boolean
  /** Custom action. Will render a button to trigger this action. */
  action?: (toastId: string) => void
  /** Custom action button text. */
  actionText?: string
}

/** Keep track of all toasts. */
export const toasts = createState<ToastItem[]>([])

const trigger = ({
  title = '',
  message = '',
  duration,
  closable = true,
  type = 'success',
  action,
  actionText
}: Partial<Omit<ToastItem, 'id'>>) => {
  const id = Math.random().toString()
  duration = type === 'error' ? duration ?? 5000 : duration ?? 4000

  toasts.update((v) => [
    ...v,
    {
      id,
      title,
      message,
      type,
      duration,
      closable,
      action,
      actionText
    }
  ])

  return id
}

export const toast = {
  clear: () => {
    toasts.set([])
  },
  trigger,
  close: (id: string) => {
    toasts.update((toasts) => {
      return toasts.filter((toast) => toast.id !== id)
    })
  }
}
