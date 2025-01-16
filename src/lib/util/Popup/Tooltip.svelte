<script lang="ts">
  import { random } from '$lib/helpers.js'
  import { popup, type PopupSettings } from '$lib/index.js'
  import type { Placement } from '@floating-ui/dom'
  import type { Snippet } from 'svelte'

  interface Props {
    content: string
    class?: string
    position?: Placement
    children: Snippet
  }

  const { content, position, class: cls, children }: Props = $props()

  const id = random()
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
