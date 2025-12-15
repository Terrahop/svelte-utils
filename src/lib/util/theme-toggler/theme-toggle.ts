import { isBrowser } from '$lib/helpers.js'
import { theme as themeStore } from './index.svelte.js'

// eslint-disable-next-line jsdoc/require-jsdoc
function toggleClasses() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  for (const toggleElement of document.querySelectorAll('[data-toggle-theme]') as NodeListOf<HTMLElement>) {
    const activeClass = toggleElement.dataset.actClass
    if (activeClass) toggleElement.classList.toggle(activeClass)
  }
}

export const themeToggle = () => {
  if (!isBrowser) return
  const removeListeners: Array<() => void> = []

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  for (const toggleElement of document.querySelectorAll('[data-toggle-theme]') as NodeListOf<HTMLElement>) {
    const dataKey = toggleElement.dataset.key ?? 'theme'
    const themesList = toggleElement.dataset.toggleTheme
    const themesArray = themesList?.split(',') ?? []
    const activeClass = toggleElement.dataset.actClass

    const toggleTheme0 = themesArray[0]
    const toggleTheme1 = themesArray[1]

    const theme = localStorage.getItem(dataKey)

    if (activeClass) {
      if (!theme) toggleElement.classList.add(activeClass)
      if (theme) {
        const themeJson = JSON.parse(theme) as string

        if (themeJson === toggleTheme0) {
          toggleElement.classList.add(activeClass)
        }
      }
    }

    // eslint-disable-next-line jsdoc/require-jsdoc
    function onClick(this: HTMLElement) {
      const theme = localStorage.getItem(dataKey)
      if (!themesList) return
      const themeJson = theme ? JSON.parse(theme) as string : toggleTheme0

      if (themeJson === toggleTheme0) {
        if (themesArray.length === 1) {
          delete document.documentElement.dataset.theme
          localStorage.removeItem(dataKey || 'theme')
        } else {
          themeStore.set(toggleTheme1)
        }
      } else {
        themeStore.set(toggleTheme0)
      }

      toggleClasses()
    }

    toggleElement.addEventListener('click', onClick)

    removeListeners.push(() => {
      toggleElement.removeEventListener('click', onClick)
    })
  }

  return () => {
    for (const v of removeListeners) v()
  }
}
