import { migrate } from '$lib/database/migrate'
import { initI18n } from '$lib/i18n.svelte'
import { loadAllModules } from '$lib/modules/registry'
import { moduleStore } from '$lib/stores/modules.svelte'

export const ssr = false
export const prerender = true

export async function load({ fetch }) {
  await migrate(fetch)
  initI18n()
  await loadAllModules()
  await moduleStore.loadModuleCards()
}
