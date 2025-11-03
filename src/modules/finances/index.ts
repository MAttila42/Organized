import { moduleStore } from '$lib/stores/modules.svelte'
import { finances } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'finances',
    name: 'Finances',
    description: 'Track wallets, balances, and transactions.',
    links: [
      {
        id: 'wallet-balances',
        name: 'Wallet balances',
        description: 'Snapshot of each wallet with its current balance.',
        moduleId: 'finances',
        type: 'label',
        call: () => import('./labels/WalletBalances.svelte'),
        parameters: [],
      },
    ],
    component: () => import('./finances.svelte'),
  })

  finances.loadAll()
}
