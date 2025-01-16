// WIP
import type { ActionReturn } from 'svelte/action'

/**
 * Calculate and create the necessary classList to add to element for ripple effects.
 * Thanks to matyunya: https://github.com/matyunya/smelte/blob/master/src/components/Ripple/ripple.js .
 * @param centered - Weather to ripple from center only.
 * @returns Function of MouseEvent processor.
 */
const injectRipple = (centered = false) => {
  return (event: MouseEvent) => {
    const target = event.currentTarget as HTMLInputElement
    const circle = document.createElement('span')
    const upper = Math.max(target.clientWidth, target.clientHeight)

    const removeCircle = (): void => {
      circle.remove()
      circle.removeEventListener('animationend', removeCircle)
    }

    circle.addEventListener('animationend', removeCircle)

    // Set circle size larger than current elements size
    circle.style.width = circle.style.height = `${upper}px`

    const rect = target.getBoundingClientRect()

    if (centered) {
      circle.classList.add('absolute', 'top-0', 'left-0', 'ripple-centered', 'bg-primary-500/30')
    } else {
      // Set ripple initial position.
      circle.style.left = `${event.clientX - rect.left - upper / 2}px`
      circle.style.top = `${event.clientY - rect.top - upper / 2}px`

      // Apply ripple class
      circle.classList.add('ripple-normal', 'bg-primary-500/30')
    }

    circle.classList.add('ripple')

    target.append(circle)
  }
}

/**
 * Create a ripple function with parameters to use with svelte components.
 * @param centered - Wether to ripple from center only.
 * @returns Function to use with svelte `use` directive.
 */
const createRipple = (centered?: boolean): ((node: Element) => ActionReturn) => {
  return (node: Element): ActionReturn => {
    const onMouseDown = injectRipple(centered) as EventListenerOrEventListenerObject
    node.addEventListener('click', onMouseDown)
    node.classList.add('ripple-pre')
    return {
      destroy: () => {
        node.removeEventListener('click', onMouseDown)
      }
    }
  }
}

/** Ripple function to use with svelte `use` directive. */
export const ripple = createRipple()

export default createRipple

/* ----- */
/* CSS for components with click ripples. */
/* ----- */

// .ripple {
//   @apply absolute scale-0;
//   border-radius: 50%;
// }
//
// .ripple-pre {
//   @apply relative overflow-hidden;
// }
//
// .ripple-normal {
//   animation: ripple-normal 0.45s;
// }
//
// @keyframes ripple-normal {
//   to {
//     transform: scale(4);
//     will-change: transform;
//     opacity: 0;
//   }
// }
