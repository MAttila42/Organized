import { t } from '$lib/i18n.svelte'
import { moduleStore } from '$lib/stores/modules.svelte'
import { finances } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'finances',
    name: t('modules.finances.name', 'Finances'),
    description: t('modules.finances.description', 'Track wallets, balances, and transactions.'),
    links: [
      {
        id: 'wallet-balances',
        name: t('modules.finances.links.walletBalances.name', 'Wallet balances'),
        description: t('modules.finances.links.walletBalances.description', 'Snapshot of each wallet with its current balance.'),
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
