import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import fmt from '@terrahop/oxc-config-svelte/fmt'
import lint from '@terrahop/oxc-config-svelte/lint'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  build: {
    minify: 'oxc',
  },
  fmt,
  lint,
  pack: {
    publint: true,
  },
  plugins: [tailwindcss(), sveltekit()],
  staged: {
    '*': 'vp check --fix',
  },
})
