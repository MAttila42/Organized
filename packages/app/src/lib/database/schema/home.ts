import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userModules = sqliteTable('user_modules', {
  id: integer().primaryKey({ autoIncrement: true }),
  moduleId: text('module_id').notNull(),
  color: text().notNull().default('#FFFFFF'),
  displayOrder: integer('display_order').notNull().default(0),
})

export const userLinks = sqliteTable('user_links', {
  id: integer().primaryKey({ autoIncrement: true }),
  linkId: text('link_id').notNull(),
  type: text({ enum: ['shortcut', 'label'] }).notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  icon: text(),
  color: text().notNull().default('#FFFFFF'),
  parameters: text({ mode: 'json' }).$type<Record<string, any>>(),
  moduleId: text('module_id').notNull(),
})
