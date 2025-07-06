import { migrate } from '$lib/database/migrate'
import { initI18n } from '$lib/i18n.svelte'

export const ssr = false
export const prerender = true

export async function load({ fetch }) {
  await migrate(fetch)
  initI18n()
}
