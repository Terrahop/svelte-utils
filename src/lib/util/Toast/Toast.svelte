<script lang="ts">
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  import { SvelteMap } from 'svelte/reactivity'
  import { toasts, type ToastItem } from './toast.svelte.js'
  import type { Snippet } from 'svelte'

  interface ToastProps {
    /** Root css. */
    rootCss?: string
    closeBtnCss?: string
    toastCss?: string
    /**
     * Toast position.
     * @default 'toast-end toast-bottom'.
     */
    typeColors?: {
      info: string
      success: string
      warning: string
      error: string
      primary: string
    }
    /** A custom toast component, proves the toast and countdown as props. */
    toast?: Snippet<[t: ToastItem & { countdown?: number }]>
  }

  const close = (id: string) => {
    toasts.update((toasts) => {
      return toasts.filter((toast) => toast.id !== id)
    })
  }

  const {
    rootCss = 'toast toast-end toast-bottom',
    toastCss = 'border-base-content/10 bg-base-200 rounded-box',
    closeBtnCss = 'btn btn-circle btn-ghost btn-sm hover:bg-base-content/50',
    typeColors = {
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      primary: 'bg-primary text-primary-content'
    },
    toast
  }: ToastProps = $props()

  let history: ToastItem[] = []

  const countdowns = new SvelteMap<string, number>()

  const startCountdown = async (id: string, step: number) => {
    countdowns.set(id, 100)

    while (countdowns.get(id)! > 0) {
      const current = countdowns.get(id)!
      countdowns.set(id, current - step)
      await new Promise((resolve) => setTimeout(resolve, 9.9)) // Just don't look at it...
    }

    countdowns.delete(id)
  }

  $effect(() => {
    const t = toasts.get
    history = history.filter((h) => t.some((t) => t.id === h.id))

    // Get items not already in history
    const newToasts = t.filter((t) => !history.some((h) => h.id === t.id))

    // Add new items
    for (const toast of newToasts) {
      history.push(toast)

      if (!toast.duration || toast.duration === 0) continue

      const step = 100 / (toast.duration / 10)

      // Start countdown progress
      void startCountdown(toast.id, step)

      setTimeout(() => {
        close(toast.id)
      }, toast.duration)
    }
  })

  const hasToasts = $derived(toasts.get.length > 0 ? '' : 'p-0')

  const classRoot = $derived(`${rootCss} ${hasToasts} z-50`)
</script>

<div class={classRoot}>
  {#each toasts.get as toastL (toastL)}
    {#if toast}
      {@render toast({ ...toastL, countdown: countdowns.get(toastL.id) })}
    {:else}
      <div class="{toastCss} relative flex w-fit max-w-sm self-end whitespace-normal border py-2 pr-2 drop-shadow">
        <div class="absolute left-0 top-0 h-full w-1.5 min-w-1.5 {typeColors[toastL.type]} rounded-l-box"></div>
        <div class="flex flex-col py-2 pl-5 pr-4">
          {#if toastL.title}
            <h4 class="font-bold">{toastL.title}</h4>
          {/if}

          <span>
            {#each (toastL.message ?? '').split('\n') as line}
              {line}
              <br />
            {/each}
          </span>
        </div>

        <div class="flex items-center gap-2">
          {#if toastL.action}
            <button class="btn btn-success btn-xs" onclick={() => toastL.action?.(toastL.id)} onkeydown={() => toastL.action?.(toastL.id)}>
              {toastL.actionText ?? 'asd'}
            </button>
          {/if}

          {#if toastL.closable}
            <button class={closeBtnCss} onclick={() => close(toastL.id)} onkeydown={() => close(toastL.id)}> ✕ </button>
          {/if}
        </div>

        {#if toastL.duration}
          <div
            class="{typeColors[toastL.type]} absolute bottom-0 left-1.5 h-0.5"
            style="right: {100 - (countdowns.get(toastL.id) ?? 0)}%;"
          ></div>
        {/if}
      </div>
    {/if}
  {/each}
</div>
