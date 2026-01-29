import type { ApiApp } from '../../../../web/src/routes/api/[...slugs]/+server'
import { appStore } from '$lib/stores/app.svelte'
import { treaty } from '@elysiajs/eden'

let cachedBaseUrl: string | null = null
let cachedClient: ReturnType<typeof treaty<ApiApp>> | null = null

export function getApiClient() {
  const baseUrl = appStore.apiUrl
  if (!baseUrl)
    throw new Error('Online features are unavailable. Configure API_URL to continue.')

  if (!cachedClient || cachedBaseUrl !== baseUrl) {
    cachedClient = treaty<ApiApp>(baseUrl)
    cachedBaseUrl = baseUrl
  }

  return cachedClient
}

/**
 * Build headers for API requests.
 * Includes the instance token which identifies this app installation.
 */
export function buildInstanceHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {}

  const instanceToken = appStore.instanceToken?.trim()
  if (instanceToken)
    headers['x-instance-token'] = instanceToken

  return {
    ...headers,
    ...extra,
  }
}
