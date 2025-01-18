<script lang="ts">
  import type { PopupSettings } from '../../index.js'
  import type { Placement } from '@floating-ui/dom'
  import type { Snippet } from 'svelte'
  import Popup from './Popup.svelte'
  import { getDefaults, type DefaultTooltip } from '../../defaults.js'

  interface Props extends Pick<PopupSettings, 'placement'>, DefaultTooltip {
    children: Snippet
    content?: string
    offset?: number
    placement?: Placement
  }

  const defaults = getDefaults().tooltip

  let {
    children,
    class: cls = defaults?.class,
    cContent = defaults?.cContent ?? 'rounded-box border border-base-content/5 bg-base-100 px-4 py-2 shadow-md',
    content: tooltipContent,
    cZ = defaults?.cZ,
    offset,
    placement
  }: Props = $props()

  cls = `${cls} ${defaults?.classMerge ?? ''}`
  cContent = defaults?.cContentMerge ? `${cContent} ${defaults.cContentMerge}` : cContent
</script>

{#if tooltipContent}
  <Popup event="hover" class={cls} {cContent} {placement} middleware={{ offset }} {cZ}>
    {#snippet trigger()}
      {@render children()}
    {/snippet}

    {#snippet content()}
      <p class="w-fit whitespace-nowrap">{tooltipContent}</p>
    {/snippet}
  </Popup>
{:else}
  {@render children()}
{/if}
<!-- <div class="{cls} size-full" use:popup={opts}> -->
<!--   {@render children()} -->
<!-- </div> -->
<!-- <div class="z-20 w-fit rounded-box border border-base-content/5 bg-base-100 px-4 py-2 drop-shadow-md" data-popup={id}> -->
<!--   <p class="w-fit whitespace-nowrap">{content}</p> -->
<!-- </div> -->
