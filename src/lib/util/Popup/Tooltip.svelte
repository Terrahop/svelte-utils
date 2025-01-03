<script lang="ts">
  import type { Placement } from '@floating-ui/dom'
  import type { PopupSettings } from './types.js'
  import { popup } from './popup.js'
  import type { Snippet } from 'svelte'

  interface Props {
    content: string
    class?: string
    position?: Placement
    children: Snippet
  }

  const { content, position, class: cls, children }: Props = $props()

  const id = Math.random().toString()
  const opts: PopupSettings = {
    event: 'hover',
    target: id,
    placement: position ?? 'bottom',
    middleware: {
      offset: 8
    }
  }
</script>

<div class="{cls} size-full" use:popup={opts}>
  {@render children()}
</div>
<div class="z-20 w-fit rounded-box border border-base-content/5 bg-base-100 px-4 py-2 drop-shadow-md" data-popup={id}>
  <p class="w-fit whitespace-nowrap">{content}</p>
</div>
