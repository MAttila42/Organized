import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const test = sqliteTable('test', {
  id: integer('id').primaryKey().unique(),
  test: text('test'),
})

export const shortcuts = sqliteTable('shortcuts', {
  num: integer().unique(),
  icon: text(),
  color: text(),
  action: text({ mode: 'json' }).$type<Action>(),
  module: text(),
})

export interface Action {
  id: string
  params: Parameter[]
}

export interface Parameter {
  id: string
  type: string
}
