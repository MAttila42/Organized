import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],
  alias: {
    $: fileURLToPath(new URL('./stores', import.meta.url)),
    db: fileURLToPath(new URL('./database', import.meta.url)),
  },

  colorMode: {
    preference: 'system',
    classSuffix: '',
  },
  css: ['@unocss/reset/tailwind.css'],
  features: { inlineStyles: false },
  eslint: { config: { standalone: false } },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },

  telemetry: false,
  ssr: false,
  routeRules: {
    '/*': { prerender: true },
  },
  devServer: { host: '0.0.0.0' },
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      target: 'ES2022',
    },
    server: {
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
        port: 5183,
      },
    },
  },

  compatibilityDate: '2024-08-08',
})
