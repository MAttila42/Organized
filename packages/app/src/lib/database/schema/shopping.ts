import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

// Local shopping items (device-only list)
// Note: Using explicit column names because sqlite-proxy driver has a bug where casing config
// is not applied correctly when passed as the 2nd argument (without batch callback)
export const shoppingLocalItems = sqliteTable('shopping_local_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: text('quantity'),
  unit: text('unit'),
  description: text('description'),
  inCart: integer('in_cart').notNull().default(0),
})

export type SelectLocalItem = typeof shoppingLocalItems.$inferSelect
export type InsertLocalItem = typeof shoppingLocalItems.$inferInsert

// Cached shared list memberships (for offline reference)
export const shoppingMemberships = sqliteTable('shopping_memberships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  listId: text('list_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color'),
  isOwner: integer('is_owner').notNull().default(0), // 1 if this instance created the list
  syncedAt: integer('synced_at').notNull().default(0),
}, table => [
  uniqueIndex('shopping_memberships_list_id_unique').on(table.listId),
])

export type SelectMembership = typeof shoppingMemberships.$inferSelect
export type InsertMembership = typeof shoppingMemberships.$inferInsert
