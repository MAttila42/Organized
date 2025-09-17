import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const shoppingList = sqliteTable('shopping_list', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: integer('quantity'),
  unit: text('unit'),
  description: text('description'),
})
export type SelectShoppingList = typeof shoppingList.$inferSelect
