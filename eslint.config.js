import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    svelte: true,
    rules: {
      'no-console': 'warn',
      'curly': ['warn', 'multi-or-nest', 'consistent'],
      'antfu/curly': 'off',
      'style/jsx-one-expression-per-line': ['warn', { allow: 'single-line' }],
    },
    ignores: [
      '**/core/*',
      '**/static/*',
    ],
  },
)
