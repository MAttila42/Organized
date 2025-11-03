import { moduleStore } from '$lib/stores/modules.svelte'
import { finances } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'finances',
    name: 'Finances',
    description: 'Track wallets, balances, and transactions.',
    links: [],
    component: () => import('./finances.svelte'),
  })

  finances.loadAll()
}
