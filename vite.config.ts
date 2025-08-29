import process from 'node:process'
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(() => {
  return {
    plugins: [
      UnoCSS({
        extractors: [extractorSvelte()],
      }),
      sveltekit(),
    ],
    clearScreen: false,
    server: {
      port: 5173,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: 'ws',
            host,
            port: 5173,
          }
        : undefined,
      watch: {
        ignored: ['**/core/**'],
      },
    },
  }
})
