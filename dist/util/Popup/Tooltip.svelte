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
    class: cls = defaults?.class ?? '',
    cContent = defaults?.cContent ?? 'rounded-box border border-base-content/5 bg-base-100 px-4 py-2 shadow-md',
    content: tooltipContent,
    cZ = defaults?.cZ,
    offset,
    placement
  }: Props = $props()

  if (defaults?.classMerge) cls += ` ${defaults.classMerge}`
  if (defaults?.cContentMerge) cContent += ` ${defaults.cContentMerge}`
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
