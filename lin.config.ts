import process from 'node:process'
import { defineConfig } from '@yuo-app/lin'

export default defineConfig({
  i18n: {
    locales: ['en-US', 'hu-HU'],
    defaultLocale: 'en-US',
    directory: 'src/lib/locales',
  },
  options: {
    provider: (process.env.LLM_PROVIDER as 'openai' | 'anthropic' | 'google' | 'xai' | 'mistral' | 'groq' | 'cerebras' | 'azure') || 'openai',
    model: process.env.LLM_MODEL || 'gpt-4.1-nano',
    apiKey: process.env.LLM_API_KEY || '',
    temperature: 0,
    mode: 'json',
  },
})
