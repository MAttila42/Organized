import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const calendarTasks = sqliteTable('calendar_tasks', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  date: text('date').notNull(),
  time: text('time'),
  description: text('description'),
  completed: integer('completed').notNull().default(0),
})
export type SelectCalendarTask = typeof calendarTasks.$inferSelect
export type InsertCalendarTask = typeof calendarTasks.$inferInsert
