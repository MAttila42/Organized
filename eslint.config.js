import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'style/max-statements-per-line': ['error', { max: 2 }],
    },
  },
))
