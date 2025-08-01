import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      UnoCSS({
        extractors: [extractorSvelte()],
      }),
      sveltekit(),
    ],
  }
})
