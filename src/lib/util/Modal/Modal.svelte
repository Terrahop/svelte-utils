<script lang="ts" context="module">
  /* eslint-disable svelte/no-at-html-tags */

  import { fly, fade } from 'svelte/transition'
  import type { Transition, TransitionParams } from '../../transitions/transitions.js'
  import { dynamicTransition } from '../../transitions/transitions.js'

  type FlyTransition = typeof fly
</script>

<script lang="ts" generics="TransitionIn extends Transition = FlyTransition, TransitionOut extends Transition = FlyTransition">
  import { createEventDispatcher } from 'svelte'

  // Event Dispatcher
  interface ModalEvent {
    backdrop: MouseEvent
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const dispatch = createEventDispatcher<ModalEvent>()

  // Types
  import type { SvelteEvent } from '../../types.js'
  import { prefersReducedMotion } from 'svelte/motion'
  import { focusTrap } from '../../actions/index.js'

  import { getModalStore } from './modal.svelte.js'
  import type { ModalComponent, ModalSettings } from './types.js'

  // Props (components)
  /** Register a list of reusable component modals. */
  export let components: Record<string, ModalComponent> = {}

  // Props (backdrop)
  /** Set the modal position within the backdrop container. */
  export let position = 'items-center'

  // Props (modal)
  /** Provide classes to style the modal background. */
  export let background = 'bg-base-100'
  /** Provide classes to style the modal width. */
  export let width = 'w-modal'
  /** Provide classes to style the modal height. */
  export let height = 'h-auto'
  /** Provide classes to style the modal padding. */
  export let padding = 'p-4'
  /** Provide classes to style the modal spacing. */
  export let spacing = 'space-y-4'
  /** Provide classes to style the modal border radius. */
  export let rounded = 'rounded-box'
  /** Provide classes to style modal box shadow. */
  export let shadow = 'shadow-xl'
  /** Provide a class to override the z-index. */
  export let zIndex = 'z-[999]'

  // Props (buttons)
  /** Provide classes for neutral buttons, such as Cancel. */
  export let buttonNeutral = 'btn-neutral'
  /** Provide classes for positive actions, such as Confirm or Submit. */
  export let buttonPositive = 'btn-success'
  /** Override the text for the Cancel button. */
  export let buttonTextCancel = 'Cancel'
  /** Override the text for the Confirm button. */
  export let buttonTextConfirm = 'Confirm'
  /** Override the text for the Submit button. */
  export let buttonTextSubmit = 'Submit'
  /** Override the default btn sizes. */
  export let buttonSize = 'btn-sm'

  // Props (regions)
  /** Provide arbitrary classes to the backdrop region. */
  export let regionBackdrop = ''
  /** Provide arbitrary classes to transition region. */
  export let regionTransition = ''
  /** Provide arbitrary classes to modal header region. */
  export let regionHeader = 'text-2xl font-bold'
  /** Provide arbitrary classes to modal body region. */
  export let regionBody = 'max-h-[200px] overflow-hidden'
  /** Provide arbitrary classes to modal footer region. */
  export let regionFooter = 'flex justify-end space-x-2'

  // Props (transition)
  /**
   * Enable/Disable transitions.
   */
  export let transitions = !prefersReducedMotion
  /**
   * Provide the transition used on entry.
   */
  export let transitionIn: TransitionIn = fly as TransitionIn
  /**
   * Transition params provided to `TransitionIn`.
   */
  export let transitionInParams: TransitionParams<TransitionIn> = { duration: 150, opacity: 0, x: 0, y: 100 }
  /**
   * Provide the transition used on exit.
   */
  export let transitionOut: TransitionOut = fly as TransitionOut
  /**
   * Transition params provided to `TransitionOut`.
   */
  export let transitionOutParams: TransitionParams<TransitionOut> = { duration: 150, opacity: 0, x: 0, y: 100 }

  // Base Styles
  const cBackdrop = 'fixed z-0 top-0 left-0 right-0 bottom-0 bg-base-200/60 p-4'
  const cTransitionLayer = 'w-full h-fit min-h-full overflow-y-auto flex justify-center'
  const cModal = 'block overflow-y-auto' // max-h-full overflow-y-auto overflow-x-hidden
  const cModalImage = 'w-full h-auto'

  // Local
  let promptValue: unknown
  const buttonTextDefaults: Record<string, string> = {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  }
  let currentComponent: ModalComponent | undefined
  let registeredInteractionWithBackdrop = false
  let modalElement: HTMLDivElement
  let windowHeight: number
  let backdropOverflow = 'overflow-y-hidden'

  const modalStore = getModalStore()

  const handleModals = (modals: ModalSettings[]) => {
    // Set Prompt input value and type
    if (modals[0].type === 'prompt') promptValue = modals[0].value
    // Override button text per instance, if available
    buttonTextCancel = modals[0].buttonTextCancel ?? buttonTextDefaults.buttonTextCancel
    buttonTextConfirm = modals[0].buttonTextConfirm ?? buttonTextDefaults.buttonTextConfirm
    buttonTextSubmit = modals[0].buttonTextSubmit ?? buttonTextDefaults.buttonTextSubmit
    // Set Active Component
    currentComponent = typeof modals[0].component === 'string' ? components[modals[0].component] : modals[0].component
  }

  // Modal Store Subscription
  $: if ($modalStore.length > 0) handleModals($modalStore)

  const onModalHeightChange = (modal?: HTMLDivElement) => {
    let modalHeight = modal?.clientHeight
    modalHeight ??= (modal?.firstChild as HTMLElement | undefined)?.clientHeight

    // modal is closed
    if (!modalHeight) return

    backdropOverflow = modalHeight > windowHeight ? 'overflow-y-auto' : 'overflow-y-hidden'
  }
  // first child of the modal is the content.
  $: onModalHeightChange(modalElement)

  // Event Handlers ---
  const onBackdropInteractionBegin = (event: SvelteEvent<MouseEvent, HTMLDivElement>): void => {
    if (!(event.target instanceof Element)) return
    const classList = event.target.classList
    if (classList.contains('modal-backdrop') || classList.contains('modal-transition')) {
      registeredInteractionWithBackdrop = true
    }
  }
  const onBackdropInteractionEnd = (event: SvelteEvent<MouseEvent, HTMLDivElement>): void => {
    if (!(event.target instanceof Element)) return
    const classList = event.target.classList
    if ((classList.contains('modal-backdrop') || classList.contains('modal-transition')) && registeredInteractionWithBackdrop) {
      // We return `undefined` to differentiate from the cancel button
      if ($modalStore[0].response) $modalStore[0].response()
      modalStore.close()
      /** @event {{ event }} backdrop - Fires on backdrop interaction.  */
      dispatch('backdrop', event)
    }
    registeredInteractionWithBackdrop = false
  }

  const onClose = (): void => {
    if ($modalStore[0].response) $modalStore[0].response(false)
    modalStore.close()
  }

  const onConfirm = (): void => {
    if ($modalStore[0].response) $modalStore[0].response(true)
    modalStore.close()
  }

  const onPromptSubmit = (event: SvelteEvent<SubmitEvent, HTMLFormElement>): void => {
    event.preventDefault()
    if ($modalStore[0].response) {
      if ($modalStore[0].valueAttr !== undefined && 'type' in $modalStore[0].valueAttr && $modalStore[0].valueAttr.type === 'number') {
        $modalStore[0].response(Number.parseInt(promptValue as string))
      } else $modalStore[0].response(promptValue)
    }
    modalStore.close()
  }

  // A11y ---

  const onKeyDown = (event: SvelteEvent<KeyboardEvent, Window>): void => {
    if ($modalStore.length === 0) return
    if (event.code === 'Escape') onClose()
  }

  // State
  $: cPosition = $modalStore[0]?.position ?? position
  // Reactive
  $: classesBackdrop = `${cBackdrop} ${regionBackdrop} ${zIndex} ${$$props.class ?? ''} ${$modalStore[0]?.backdropClasses ?? ''}`
  $: classesTransitionLayer = `${cTransitionLayer} ${regionTransition} ${cPosition}`
  $: classesModal = `${cModal} ${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow} ${
    $modalStore[0]?.modalClasses ?? ''
  }`
  $: promptValid = $modalStore[0]?.valueAttr?.required && !promptValue
  // IMPORTANT: add values to pass to the children templates.
  // There is a way to self-reference component values, but it involves svelte-internal and is not yet stable.
  // REPL: https://svelte.dev/repl/badd0f11aa99450ca69dca6690d4d5a4?version=3.52.0
  // Source: https://discord.com/channels/457912077277855764/1037768846855118909
  $: parent = {
    position,
    // ---
    background,
    width,
    height,
    padding,
    spacing,
    rounded,
    shadow,
    // ---
    buttonNeutral,
    buttonPositive,
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit,
    // ---
    regionBackdrop,
    regionHeader,
    regionBody,
    regionFooter,
    classesModal,
    // ---
    onClose
  }
</script>

<svelte:window bind:innerHeight={windowHeight} on:keydown={onKeyDown} />

{#if $modalStore.length > 0}
  {#key $modalStore}
    <!-- Backdrop -->
    <!-- FIXME: resolve a11y warnings -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="modal-backdropp {classesBackdrop} {backdropOverflow}"
      data-testid="modal-backdrop"
      on:mousedown={onBackdropInteractionBegin}
      on:mouseup={onBackdropInteractionEnd}
      on:touchstart|passive
      on:touchend|passive
      transition:dynamicTransition|global={{ transition: fade, params: { duration: 150 }, enabled: transitions }}
      use:focusTrap={true}
    >
      <!-- Transition Layer -->
      <div
        class="modal-transition {classesTransitionLayer}"
        in:dynamicTransition|global={{ transition: transitionIn, params: transitionInParams, enabled: transitions }}
        out:dynamicTransition|global={{ transition: transitionOut, params: transitionOutParams, enabled: transitions }}
      >
        {#if $modalStore[0].type !== 'component'}
          <!-- Modal: Presets -->
          <div
            class="modal-container {classesModal}"
            bind:this={modalElement}
            data-testid="modal"
            role="dialog"
            aria-modal="true"
            aria-label={$modalStore[0].title ?? ''}
          >
            <!-- Header -->
            {#if $modalStore[0]?.title}
              <header class="modal-header {regionHeader}">{@html $modalStore[0].title}</header>
            {/if}
            <!-- Body -->
            {#if $modalStore[0]?.body}
              <article class="modal-body {regionBody}">{@html $modalStore[0].body}</article>
            {/if}
            <!-- Image -->
            {#if $modalStore[0]?.image && typeof $modalStore[0]?.image === 'string'}
              <img class="modal-image {cModalImage}" src={$modalStore[0]?.image} alt="Modal" />
            {/if}
            <!-- Type -->
            {#if $modalStore[0].type === 'alert'}
              <!-- Template: Alert -->
              <footer class="modal-footer {regionFooter}">
                <button type="button" class="btn {buttonSize} {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
              </footer>
            {:else if $modalStore[0].type === 'confirm'}
              <!-- Template: Confirm -->
              <footer class="modal-footer {regionFooter}">
                <button type="button" class="btn {buttonSize} {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
                <button type="button" class="btn {buttonSize} {buttonPositive}" on:click={onConfirm}>{buttonTextConfirm}</button>
              </footer>
            {:else if $modalStore[0].type === 'prompt'}
              <!-- Template: Prompt -->
              <form class="space-y-4" on:submit={onPromptSubmit}>
                <input
                  class="modal-prompt-input input input-sm w-full input-bordered"
                  name="prompt"
                  type="text"
                  bind:value={promptValue}
                  {...$modalStore[0].valueAttr}
                />
                <footer class="modal-footer {regionFooter}">
                  <button type="button" class="btn {buttonSize} {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
                  <button type="submit" class="btn {buttonSize} {buttonPositive}" disabled={promptValid}>{buttonTextSubmit}</button>
                </footer>
              </form>
            {/if}
          </div>
        {:else}
          <!-- Modal: Components -->
          <!-- Note: keep `contents` class to allow widths from children -->
          <div
            bind:this={modalElement}
            class="modal-container contents {$modalStore[0]?.modalClasses ?? ''}"
            data-testid="modal-component"
            role="dialog"
            aria-modal="true"
            aria-label={$modalStore[0].title ?? ''}
          >
            {#if currentComponent?.slot}
              <svelte:component this={currentComponent.ref} {...currentComponent.props} {parent}>
                {@html currentComponent.slot}
              </svelte:component>
            {:else}
              <svelte:component this={currentComponent?.ref} {...currentComponent?.props} {parent} />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/key}
{/if}

<style lang="postcss">
  .w-modal-slim {
    @apply w-full max-w-[400px];
  }

  .w-modal {
    @apply w-full max-w-[640px];
  }

  .w-modal-wide {
    @apply w-full max-w-[80%];
  }

  /* Provides initial focus selection styles on opening the modal */
  .modal *:focus:not([tabindex='-1']):not(.input):not(.textarea):not(.select):not(.input-group):not(.input-group input) {
    outline-style: auto;
    @apply outline-[-webkit-focus-ring-color];
  }
</style>
