<script lang="ts">
  import { isBrowser } from '$lib/helpers.js'
  import { theme } from './index.svelte.js'
  import { themeToggle } from './theme-toggle.js'

  const {
    dark = 'dark',
    light = 'light',
    viewTransition = false
  }: { dark?: string, light?: string, viewTransition?: boolean } = $props()

  $effect(() => {
    const unlisten = themeToggle()
    // themeBtn()
    return () => {
      unlisten?.()
    }
  })

  $effect.pre(() => {
    theme.setDark(dark)
    theme.setLight(light)
    theme.viewTransition = viewTransition
  })

  $effect(() => {
    if (!isBrowser || !theme.value) return

    document.documentElement.dataset.theme = theme.value
  })
</script>

<svelte:head>
  <script lang="ts">
    if (document) {
      let theme = JSON.parse(localStorage.getItem('theme'))

      if (theme) {
        document.documentElement.dataset.theme = theme
      }
    }
  </script>
</svelte:head>
