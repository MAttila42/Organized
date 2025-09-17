import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const groceries = sqliteTable('groceries', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  quantity: integer('quantity'),
  unit: text('unit'),
  description: text('description'),
})
