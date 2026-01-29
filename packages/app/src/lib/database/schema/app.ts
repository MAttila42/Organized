import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const appInstance = sqliteTable('app_instance', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  token: text('instance_token').notNull(),
})

export type SelectAppInstance = typeof appInstance.$inferSelect
export type InsertAppInstance = typeof appInstance.$inferInsert
