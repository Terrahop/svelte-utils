<!--
@component
Popup Component. Draws a floating popup when the provided snippet toggle is triggered

```tsx
<Popup>
  // Either use Toggle which is the child of a div that uses the popup action
  {#snippet Toggle({ isOpen, chevron })}
    <button>toggle</button>
  {/snippet}

  // Or use ToggleRoot and pass along popup and options
  {#snippet ToggleRoot({ settings, popup, isOpen, chevron })}
    <button use:popup={settings}>toggle</button>
  {/snippet}

  // The popup content
  {#snippet Popup(isOpen)}
    Popup Content
  {/snippet}
</Popup>
```
-->
<script module>
  import './popup.css'
</script>

<script lang="ts">
  import type { PopupSettings } from '../../index.js'
  import { getDefaults, type DefaultPopup } from '../../defaults.js'
  import { ChevronDown, ChevronUp } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { popup as popupAction } from '../../actions/popup.js'
  import type { Snippet } from 'svelte'
  import { random } from '../../helpers.js'
  import { fade } from 'svelte/transition'

  interface Props extends Omit<Partial<PopupSettings>, 'target' | 'state'>, DefaultPopup {
    content?: Snippet
    contentRoot?: Snippet<[id: string]>
    /**
     * Should the popup container be set to hidden when closed.
     * @default false
     */
    closeHidden?: boolean
    trigger?: Snippet<[{ isOpen: boolean, chevron: Snippet }]>
    /**
     * Root toggle snippet, use the to create the toggle popup element directly, it gets provided the
     * settings as an arg to the snippet. The element must be in the document on page render and you must use
     * the popup action provided in the snippet args on the element.
     */
    triggerRoot?: Snippet<[{ settings: PopupSettings, popup: typeof popupAction, isOpen: boolean, chevron: Snippet }]>
  }

  const defaults = getDefaults().popup

  let {
    trigger,
    triggerRoot,
    content,
    contentRoot,
    class: cls = defaults?.class,
    cContent = defaults?.cContent ?? 'rounded-box border border-base-content/5 bg-base-100 p-2 shadow-lg',
    content: tooltipContent,
    cZ = defaults?.cZ ?? 'z-10',
    cPopup = '',
    closeHidden = false,
    ...rest
  }: Props = $props()

  const id = random()

  cls = `${cls} ${defaults?.classMerge ?? ''}`
  cContent = defaults?.cContentMerge ? `${cContent} ${defaults.cContentMerge}` : cContent

  let isOpen = $state(false)
  const classPopup = $derived(`${cZ} ${cPopup} ${isOpen ? '' : (closeHidden ? '!hidden' : '')}`)
  const classContent = $derived(cContent)

  const popupSettings: PopupSettings = {
    event: 'click',
    target: id,
    state: (event) => (isOpen = event.state),
    ...rest
  }
</script>

{#snippet chevron()}
  <Icon src={isOpen ? ChevronUp : ChevronDown} size="20" class="text-alt" />
{/snippet}

{#if triggerRoot}
  {@render triggerRoot({ settings: popupSettings, popup: popupAction, isOpen, chevron })}
{:else if trigger}
  <div use:popupAction={popupSettings} class="{cls} flex justify-between">
    {@render trigger({ isOpen, chevron })}
  </div>
{/if}

{#if contentRoot}
  {@render contentRoot(id)}
{:else if content}
  <div data-popup={id} class={classPopup}>
    {#if isOpen}
      <div class={classContent} transition:fade={{ duration: 100 }}>
        {@render content()}
      </div>
    {/if}
  </div>
{/if}
