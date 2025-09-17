import { migrate } from '$lib/database/migrate'
import { initI18n } from '$lib/i18n.svelte'
import { moduleStore } from '$lib/stores/modules.svelte'
import { loadAllModules } from '../modules/registry'

export const ssr = false
export const prerender = false

export async function load({ fetch }) {
  await migrate(fetch)
  initI18n()
  await loadAllModules()
  await moduleStore.loadModuleCards()
  await moduleStore.loadShortcuts()
}
