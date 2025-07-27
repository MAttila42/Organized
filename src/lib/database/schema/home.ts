import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userModules = sqliteTable('user_modules', {
  id: integer().primaryKey({ autoIncrement: true }),
  moduleId: text().notNull(),
  color: text().notNull(),
  displayOrder: integer().notNull().default(0),
})

export const userLinks = sqliteTable('user_links', {
  id: integer().primaryKey({ autoIncrement: true }),
  linkId: text().notNull(),
  type: text({ enum: ['shortcut', 'label'] }).notNull(),
  displayOrder: integer().notNull().default(0),
  icon: text(),
  color: text(),
  parameters: text({ mode: 'json' }).$type<Record<string, any>>(),
  moduleId: text().notNull(),
})

export const userModulesRelations = relations(userModules, ({ many }) => ({
  labels: many(userLinks),
}))

export const userLinksRelations = relations(userLinks, ({ one }) => ({
  module: one(userModules, {
    fields: [userLinks.moduleId],
    references: [userModules.id],
  }),
}))
