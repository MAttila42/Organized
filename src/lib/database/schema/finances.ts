import { sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const wallets = sqliteTable('wallets', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color').notNull().default('#2563EB'),
  description: text('description'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})
export type SelectWallet = typeof wallets.$inferSelect
export type InsertWallet = typeof wallets.$inferInsert

export const walletTransactions = sqliteTable('wallet_transactions', {
  id: integer().primaryKey({ autoIncrement: true }),
  walletId: integer('wallet_id').notNull().references(() => wallets.id, { onDelete: 'cascade' }),
  amount: real('amount').notNull(),
  description: text('description'),
  occurredAt: text('occurred_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})
export type SelectWalletTransaction = typeof walletTransactions.$inferSelect
export type InsertWalletTransaction = typeof walletTransactions.$inferInsert
