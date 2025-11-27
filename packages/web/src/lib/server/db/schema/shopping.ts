import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const shoppingLists = sqliteTable('shopping_lists', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  accessToken: text().$defaultFn(() => crypto.randomUUID().replaceAll(/-/g, '')),
  ownerId: text().notNull(),
  name: text().notNull(),
  description: text(),
  color: text(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
})

export const shoppingItems = sqliteTable('shopping_items', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  listId: text().notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  quantity: text(),
  unit: text(),
  description: text(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
})
