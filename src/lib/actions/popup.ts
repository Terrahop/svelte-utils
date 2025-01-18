/* eslint-disable */
import { get, writable, type Writable } from 'svelte/store'
import type { Placement } from '@floating-ui/dom'
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Options & Middleware
export interface Middleware {
  // Required ---
  /** Offset middleware settings: https://floating-ui.com/docs/offset. */
  offset?: number | Record<string, any>
  /** Shift middleware settings: https://floating-ui.com/docs/shift. */
  shift?: Record<string, any>
  /** Flip middleware settings: https://floating-ui.com/docs/flip. */
  flip?: Record<string, any>
  /** Arrow middleware settings: https://floating-ui.com/docs/arrow. */
  arrow?: { element: string } & Record<string, any>
  // Optional ---
  /** Size middleware settings: https://floating-ui.com/docs/size. */
  size?: Record<string, any>
  /** Auto Placement middleware settings: https://floating-ui.com/docs/autoPlacement. */
  autoPlacement?: Record<string, any>
  /** Hide middleware settings: https://floating-ui.com/docs/hide. */
  hide?: Record<string, any>
  /** Inline middleware settings: https://floating-ui.com/docs/inline. */
  inline?: Record<string, any>
}

export interface PopupSettings {
  /**
   * Event trigger type.
   */
  event: 'click' | 'hover' | 'focus-blur' | 'focus-click'
  /** Match the popup data value `data-popup="targetNameHere"`. */
  target: string
  /**
   * Should clicking outside the popup, close the popup.
   * @default true
   */
  outsideClose?: boolean
  /**
   * Set the placement position.
   * @default 'bottom'.
   */
  placement?: Placement
  /**
   * Query elements that close the popup when clicked.
   * @default 'a[href], button'
   */
  closeQuery?: string
  /** Optional callback function that reports state change. */
  state?: (event: { state: boolean }) => void
  /** Provide Floating UI middleware settings. */
  middleware?: Middleware
}

// Use a store to pass the Floating UI import references
export const storePopup: Writable<any> = writable()

export const initPopupStore = () => {
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
}

export const popup = (triggerNode: HTMLElement, args: PopupSettings) => {
  args.outsideClose ??= true
  // Floating UI Modules
  const { computePosition, autoUpdate, offset, shift, flip, arrow, size, autoPlacement, hide, inline } = get(storePopup)
  // Local State
  const popupState = {
    open: false,
    autoUpdateCleanup: () => { }
  }
  const focusableAllowedList = ':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])'
  let focusablePopupElements: HTMLElement[]
  // Elements
  let elemPopup: HTMLElement
  let elemArrow: HTMLElement

  const setDomElements = (): void => {
    elemPopup = document.querySelector(`[data-popup="${args.target}"]`) ?? document.createElement('div')
    elemArrow = elemPopup.querySelector('.arrow') ?? document.createElement('div')
  }
  setDomElements() // init

  // Render Floating UI Popup
  const render = (): void => {
    // Error handling for required Floating UI modules
    if (!elemPopup) throw new Error(`The data-popup="${args.target}" element was not found.`)
    if (!computePosition) throw new Error(`Floating UI 'computePosition' not found for data-popup="${args.target}".`)
    if (!offset) throw new Error(`Floating UI 'offset' not found for data-popup="${args.target}".`)
    if (!shift) throw new Error(`Floating UI 'shift' not found for data-popup="${args.target}".`)
    if (!flip) throw new Error(`Floating UI 'flip' not found for data-popup="${args.target}".`)
    if (!arrow) throw new Error(`Floating UI 'arrow' not found for data-popup="${args.target}".`)

    // Bundle optional middleware
    const optionalMiddleware = []
    // https://floating-ui.com/docs/size
    if (size) optionalMiddleware.push(size(args.middleware?.size))
    // https://floating-ui.com/docs/autoPlacement
    if (autoPlacement) optionalMiddleware.push(autoPlacement(args.middleware?.autoPlacement))
    // https://floating-ui.com/docs/hide
    if (hide) optionalMiddleware.push(hide(args.middleware?.hide))
    // https://floating-ui.com/docs/inline
    if (inline) optionalMiddleware.push(inline(args.middleware?.inline))

    // Floating UI Compute Position
    // https://floating-ui.com/docs/computePosition
    computePosition(triggerNode, elemPopup, {
      placement: args.placement ?? 'bottom',
      // Middleware - NOTE: the order matters:
      // https://floating-ui.com/docs/middleware#ordering
      middleware: [
        // https://floating-ui.com/docs/offset
        offset(args.middleware?.offset ?? 4),
        // https://floating-ui.com/docs/shift
        shift(args.middleware?.shift ?? { padding: 8 }),
        // https://floating-ui.com/docs/flip
        flip(args.middleware?.flip),
        // https://floating-ui.com/docs/arrow
        arrow(args.middleware?.arrow ?? { element: elemArrow || null }),
        // Implement optional middleware
        ...optionalMiddleware
      ]
    }).then(({ x, y, placement, middlewareData }: any) => {
      Object.assign(elemPopup.style, {
        left: `${x}px`,
        top: `${y}px`
      })
      // Handle Arrow Placement:
      // https://floating-ui.com/docs/arrow
      if (elemArrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow
        // @ts-expect-error implicit any
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[placement.split('-')[0]]
        Object.assign(elemArrow.style, {
          left: arrowX == undefined ? '' : `${arrowX}px`,
          top: arrowY == undefined ? '' : `${arrowY}px`,
          right: '',
          bottom: '',
          [staticSide]: '-4px'
        })
      }
    })
  }

  // State Handlers
  const open = (): void => {
    if (!elemPopup) return
    // Set open state to on
    popupState.open = true
    // Return the current state
    if (args.state) args.state({ state: popupState.open })
    // Update render settings
    render()
    // Update the DOM
    elemPopup.style.display = 'block'
    elemPopup.style.opacity = '1'
    elemPopup.style.pointerEvents = 'auto'
    // enable popup interactions
    elemPopup.removeAttribute('inert')
    // Trigger Floating UI autoUpdate (open only)
    // https://floating-ui.com/docs/autoUpdate
    popupState.autoUpdateCleanup = autoUpdate(triggerNode, elemPopup, render)
    // Focus the first focusable element within the popup
    focusablePopupElements = [...(elemPopup.querySelectorAll(focusableAllowedList))] as HTMLElement[]
  }

  const close = (callback?: () => void): void => {
    if (!elemPopup) return
    // Set transition duration
    const cssTransitionDuration = Number.parseFloat(window.getComputedStyle(elemPopup).transitionDuration.replace('s', '')) * 1000
    setTimeout(() => {
      // Set open state to off
      popupState.open = false
      // Return the current state
      if (args.state) args.state({ state: popupState.open })
      // Update the DOM
      elemPopup.style.opacity = '0'
      // disable popup interactions
      elemPopup.setAttribute('inert', '')
      // Cleanup Floating UI autoUpdate (close only)
      if (popupState.autoUpdateCleanup) popupState.autoUpdateCleanup()
      // Trigger callback
      if (callback) callback()
    }, cssTransitionDuration)
  }

  // Event Handlers
  const toggle = (): void => {
    if (popupState.open) close()
    else open()
  }

  const onWindowClick = (event: any): void => {
    // Return if the popup is not yet open
    if (!popupState.open) return
    // Return if click is the trigger element
    if (triggerNode.contains(event.target)) return
    // If click it outside the popup
    if (elemPopup && !elemPopup.contains(event.target) && args.outsideClose) {
      close()
      return
    }
    // Handle Close Query State
    const closeQueryString: string = args.closeQuery === undefined ? 'a[href], button' : args.closeQuery
    // Return if no closeQuery is provided
    if (closeQueryString === '') return
    const closableMenuElements = elemPopup.querySelectorAll(closeQueryString)
    for (const elem of closableMenuElements) {
      if (elem.contains(event.target)) close()
    }
  }

  // Keyboard Interactions for A11y
  const onWindowKeyDown = (event: KeyboardEvent): void => {
    if (!popupState.open) return
    // Handle keys
    const key: string = event.key
    // On Esc key
    if (key === 'Escape') {
      event.preventDefault()
      triggerNode.focus()
      close()
      return
    }
    // Update focusable elements (important for Autocomplete)
    focusablePopupElements = [...(elemPopup.querySelectorAll(focusableAllowedList))] as HTMLElement[]
    // On Tab or ArrowDown key
    const triggerMenuFocused: boolean = popupState.open && document.activeElement === triggerNode
    if (
      triggerMenuFocused &&
      (key === 'ArrowDown' || key === 'Tab') &&
      focusableAllowedList.length > 0 &&
      focusablePopupElements.length > 0
    ) {
      event.preventDefault()
      focusablePopupElements[0].focus()
    }
  }

  // Event Listeners
  switch (args.event) {
    case 'click':
      triggerNode.addEventListener('click', toggle, true)
      window.addEventListener('click', onWindowClick, true)
      break
    case 'hover':
      triggerNode.addEventListener('mouseover', open, true)
      triggerNode.addEventListener('mouseleave', () => close(), true)
      break
    case 'focus-blur':
      triggerNode.addEventListener('focus', toggle, true)
      triggerNode.addEventListener('blur', () => close(), true)
      break
    case 'focus-click':
      triggerNode.addEventListener('focus', open, true)
      window.addEventListener('click', onWindowClick, true)
      break
    default:
      throw new Error(`Event value of '${args.event}' is not supported.`)
  }
  window.addEventListener('keydown', onWindowKeyDown, true)

  // Render popup on initialization
  render()

  // Lifecycle
  return {
    update(newArgs: PopupSettings) {
      close(() => {
        args = newArgs
        render()
        setDomElements()
      })
    },
    destroy() {
      // Trigger Events
      triggerNode.removeEventListener('click', toggle, true)
      triggerNode.removeEventListener('mouseover', open, true)
      triggerNode.removeEventListener('mouseleave', () => close(), true)
      triggerNode.removeEventListener('focus', toggle, true)
      triggerNode.removeEventListener('focus', open, true)
      triggerNode.removeEventListener('blur', () => close(), true)
      // Window Events
      window.removeEventListener('click', onWindowClick, true)
      window.removeEventListener('keydown', onWindowKeyDown, true)
    }
  }
}
