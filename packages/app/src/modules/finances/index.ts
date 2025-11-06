import { t } from '$lib/i18n.svelte'
import { registerModule } from '../utils'
import { createAddTransactionShortcut } from './shortcuts'
import { finances } from './store.svelte'

export function load() {
  registerModule({
    id: 'finances',
    name: t('modules.finances.name', 'Finances'),
    description: t('modules.finances.description', 'Track wallets, balances, and transactions.'),
    links: [
      {
        id: 'record-transaction',
        name: t('modules.finances.links.recordTransaction.name', 'Record transaction'),
        description: t('modules.finances.links.recordTransaction.description', 'Open finances to record a transaction in a selected wallet.'),
        moduleId: 'finances',
        type: 'shortcut',
        call: createAddTransactionShortcut(),
        parameters: [
          {
            id: 'wallet',
            name: t('modules.finances.links.recordTransaction.parameters.wallet', 'Wallet name'),
            type: 'string',
          },
        ],
      },
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
