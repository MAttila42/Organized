import { migrate } from '$lib/database/migrate'
import { initI18n } from '$lib/i18n.svelte'
import { moduleStore } from '$lib/stores/modules.svelte'
import { loadAllModules } from '../modules/registry'

export const ssr = false
export const prerender = true

export async function load({ fetch }) {
  initI18n()
  await migrate(fetch)
  await loadAllModules()
  await moduleStore.loadModuleCards()
  await moduleStore.loadShortcuts()
}
