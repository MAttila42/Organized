import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const shoppingList = sqliteTable('shopping_list', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: integer('quantity'),
  unit: text('unit'),
  description: text('description'),
  inCart: integer('in_cart').notNull().default(0),
})
export type SelectShoppingList = typeof shoppingList.$inferSelect
export type InsertShoppingList = typeof shoppingList.$inferInsert
