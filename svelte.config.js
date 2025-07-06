import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
  i18n: {
    locales: ['en-US', 'hu-HU', 'de-DE', 'fr-FR', 'es-ES'],
    defaultLocale: 'en-US',
    directory: 'src/lib/locales',
  },
}

export default config
