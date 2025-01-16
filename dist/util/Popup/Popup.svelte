<!--@component
Popup Component. Draws a floating popup when the provided snippet toggle is triggered

@example ```
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
<script lang="ts">
  import type { DefaultPopup, PopupSettings } from '../../index.js'
  import { ChevronDown, ChevronUp } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { popup as popupAction } from '../../actions/popup.js'
  import type { Snippet } from 'svelte'
  import { random } from '../../helpers.js'

  interface Props extends Omit<Partial<PopupSettings>, 'target' | 'state'>, DefaultPopup {
    id?: string
    Toggle?: Snippet<[{ isOpen: boolean, chevron: Snippet }]>
    /**
     * Root toggle snippet, use the to create the toggle popup element directly, it gets provided the
     * settings as a prop to the snippet. The element must be in the document on page render and you must use
     * the popup action provided in the snippet props on the element.
     * @example ```svelte
     *
     * ```
     */
    ToggleRoot?: Snippet<[{ settings: PopupSettings, popup: typeof popupAction, isOpen: boolean, chevron: Snippet }]>
    Popup: Snippet<[isOpen: boolean]>
  }

  let {
    id,
    Toggle,
    ToggleRoot,
    Popup: popup,
    class: cls = '',
    cPopup = '',
    cContent = 'rounded-box border border-light bg-base-100 p-sm shadow-lg',
    closeHidden = false,
    cZ = 'z-20',
    ...rest
  }: Props = $props()

  id ??= random()

  let isOpen = $state(false)
  const classPopup = $derived(`${cZ} ${cPopup} ${isOpen ? '' : (closeHidden ? '!hidden' : '')}`)
  const classContent = $derived(cContent)

  const popupSettings: PopupSettings = {
    event: 'click',
    target: id,
    placement: 'bottom-start',
    outsideClose: true,
    closeQuery: 'button,a[href]',
    state: (event) => (isOpen = event.state),
    ...rest
  }
</script>

{#snippet chevron()}
  <Icon src={isOpen ? ChevronUp : ChevronDown} size="20" class="text-alt" />
{/snippet}

{#if ToggleRoot}
  {@render ToggleRoot({ settings: popupSettings, popup: popupAction, isOpen, chevron })}
{:else if Toggle}
  <div use:popupAction={popupSettings} class="{cls} flex justify-between">
    {@render Toggle({ isOpen, chevron })}
  </div>
{/if}
<div data-popup={id} class={classPopup}>
  {#if isOpen}
    <div class={classContent}>
      {@render popup(isOpen)}
    </div>
  {/if}
</div>
