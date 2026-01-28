import { useDatabase } from '$lib/database'
import { appInstance } from '$lib/database/schema/app'

function generateInstanceToken() {
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function')
      return crypto.randomUUID()

    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`
}

export const appStore = $state({
  apiUrl: (import.meta.env.API_URL ?? '').trim(),
  apiAuthToken: (import.meta.env.API_AUTH_TOKEN ?? '').trim(),
  instanceToken: '',
  initialized: false,

  async ensureInstanceToken() {
    if (this.instanceToken)
      return this.instanceToken

    const { database } = await useDatabase()
    const existing = await database.select().from(appInstance).limit(1)
    const token = existing[0]?.token ?? generateInstanceToken()

    if (!existing[0])
      await database.insert(appInstance).values({ token })

    this.instanceToken = token
    this.initialized = true
    return token
  },
})
