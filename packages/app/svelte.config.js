import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        '*',
        '/module/shopping',
        '/module/study',
      ],
    },
  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
}

export default config
