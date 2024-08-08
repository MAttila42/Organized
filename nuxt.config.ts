export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system',
    classSuffix: '',
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  features: {
    inlineStyles: false,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  compatibilityDate: '2024-08-08',
})
