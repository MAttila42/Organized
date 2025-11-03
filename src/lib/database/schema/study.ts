import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const classes = sqliteTable('classes', {
  id: integer().primaryKey({ autoIncrement: true }),
  subject: text('subject').notNull(),
  shortName: text('short_name'),
  teacher: text('teacher'),
  location: text('location'),
  color: text().notNull().default('#FFFFFF'),
  day: integer('day'), // 0 = Monday, 6 = Sunday
  schedule: integer('schedule'), // 0 = first period, 1 = second period, etc.
})
export type SelectClasses = typeof classes.$inferSelect
export type InsertClasses = typeof classes.$inferInsert

export const assignments = sqliteTable('assignments', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  subject: text('subject'),
  dueDate: text('due_date'),
  description: text('description'),
  completed: integer('completed').notNull().default(0),
})
export type SelectAssignments = typeof assignments.$inferSelect
export type InsertAssignments = typeof assignments.$inferInsert
