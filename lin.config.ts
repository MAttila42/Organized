import type { Provider } from '@yuo-app/lin'
import process from 'node:process'
import { defineConfig } from '@yuo-app/lin'

export default defineConfig({
  options: {
    provider: (process.env.LLM_PROVIDER as Provider) || 'openai',
    model: process.env.LLM_MODEL || 'gpt-4.1-nano',
    apiKey: process.env.LLM_API_KEY || '',
    temperature: 0,
    mode: 'json',
  },
  integration: 'svelte',
  with: 'tgt',
})
