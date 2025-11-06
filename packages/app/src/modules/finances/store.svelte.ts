import type {
  InsertWallet,
  InsertWalletTransaction,
  SelectWallet,
  SelectWalletTransaction,
} from '$lib/database/schema/finances'
import { useDatabase } from '$lib/database'
import { wallets, walletTransactions } from '$lib/database/schema/finances'
import { eq } from 'drizzle-orm'

interface WalletSummary {
  wallet: SelectWallet
  balance: number
  income: number
  expense: number
  transactionCount: number
}

export const finances = $state({
  wallets: [] as SelectWallet[],
  transactions: [] as SelectWalletTransaction[],
  selectedWalletId: null as number | null,

  get selectedWallet(): SelectWallet | undefined {
    if (this.selectedWalletId == null)
      return undefined
    return this.wallets.find(wallet => wallet.id === this.selectedWalletId)
  },

  get walletSummaries(): WalletSummary[] {
    return this.wallets.map((wallet) => {
      const related = wallet.id == null
        ? []
        : this.transactions.filter(tx => tx.walletId === wallet.id)
      const stats = summariseTransactions(related)
      return {
        wallet,
        ...stats,
      }
    })
  },

  get selectedWalletSummary(): WalletSummary | null {
    const wallet = this.selectedWallet
    if (!wallet)
      return null
    return this.walletSummaries.find(item => item.wallet.id === wallet.id) ?? {
      wallet,
      balance: 0,
      income: 0,
      expense: 0,
      transactionCount: 0,
    }
  },

  get selectedTransactions(): SelectWalletTransaction[] {
    if (this.selectedWalletId == null)
      return []
    return [...this.transactions]
      .filter(tx => tx.walletId === this.selectedWalletId)
      .sort((a, b) => {
        const aDate = toComparableDate(a.occurredAt)
        const bDate = toComparableDate(b.occurredAt)
        if (aDate === bDate)
          return (b.id ?? 0) - (a.id ?? 0)
        return bDate - aDate
      })
  },

  selectWallet(walletId: number | null) {
    this.selectedWalletId = walletId
  },

  ensureSelection() {
    if (this.wallets.length === 0) {
      this.selectedWalletId = null
      return
    }

    if (this.selectedWalletId == null || !this.wallets.some(w => w.id === this.selectedWalletId))
      this.selectedWalletId = this.wallets[0]?.id ?? null
  },

  async loadAll() {
    await Promise.all([this.loadWallets(), this.loadTransactions()])
    this.ensureSelection()
  },

  async loadWallets() {
    const { database } = await useDatabase()
    this.wallets = await database.select().from(wallets).all()
    this.ensureSelection()
  },

  async loadTransactions() {
    const { database } = await useDatabase()
    this.transactions = await database.select().from(walletTransactions).all()
  },

  async addWallet(payload: InsertWallet) {
    const { database } = await useDatabase()
    await database.insert(wallets).values(payload)
    await this.loadWallets()
    const latest = this.wallets.reduce<SelectWallet | null>((candidate, wallet) => {
      if (wallet.id == null)
        return candidate
      if (!candidate?.id || wallet.id > candidate.id)
        return wallet
      return candidate
    }, null)
    if (latest?.id != null)
      this.selectedWalletId = latest.id
  },

  async updateWallet(id: number, payload: Partial<InsertWallet>) {
    const { database } = await useDatabase()
    await database.update(wallets).set(payload).where(eq(wallets.id, id))
    await this.loadWallets()
  },

  async removeWallet(id: number) {
    const { database } = await useDatabase()
    await database.delete(walletTransactions).where(eq(walletTransactions.walletId, id))
    await database.delete(wallets).where(eq(wallets.id, id))
    await this.loadWallets()
    await this.loadTransactions()
  },

  async addTransaction(payload: InsertWalletTransaction) {
    const { database } = await useDatabase()
    await database.insert(walletTransactions).values(payload)
    await this.loadTransactions()
  },

  async updateTransaction(id: number, payload: Partial<InsertWalletTransaction>) {
    const { database } = await useDatabase()
    await database.update(walletTransactions).set(payload).where(eq(walletTransactions.id, id))
    await this.loadTransactions()
  },

  async removeTransaction(id: number) {
    const { database } = await useDatabase()
    await database.delete(walletTransactions).where(eq(walletTransactions.id, id))
    this.transactions = this.transactions.filter(tx => tx.id !== id)
  },
})

function summariseTransactions(transactions: SelectWalletTransaction[]) {
  let income = 0
  let expense = 0
  for (const tx of transactions) {
    const value = Number(tx.amount ?? 0)
    if (!Number.isFinite(value))
      continue
    if (value >= 0)
      income += value
    else
      expense += Math.abs(value)
  }
  return {
    income,
    expense,
    balance: income - expense,
    transactionCount: transactions.length,
  }
}

function toComparableDate(value: string | null | undefined) {
  if (!value)
    return 0
  const timestamp = Date.parse(value)
  if (!Number.isNaN(timestamp))
    return timestamp
  return 0
}
