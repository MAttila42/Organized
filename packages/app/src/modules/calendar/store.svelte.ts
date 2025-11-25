import type { InsertCalendarTask, SelectCalendarTask } from '$lib/database/schema/calendar'
import { useDatabase } from '$lib/database'
import { calendarTasks } from '$lib/database/schema/calendar'
import { eq } from 'drizzle-orm'

function todayKey(): string {
  const now = new Date()
  const year = now.getFullYear().toString().padStart(4, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

function normalizeTime(value?: string | null): number {
  if (!value)
    return Number.POSITIVE_INFINITY
  const [hours, minutes] = value.split(':').map(part => Number.parseInt(part, 10))
  if (Number.isFinite(hours) && Number.isFinite(minutes))
    return hours * 60 + minutes
  return Number.POSITIVE_INFINITY
}

function sortTasks(tasks: SelectCalendarTask[]): SelectCalendarTask[] {
  return [...tasks].sort((a, b) => {
    const dateCompare = (a.date ?? '').localeCompare(b.date ?? '')
    if (dateCompare !== 0)
      return dateCompare

    const completedCompare = (a.completed ?? 0) - (b.completed ?? 0)
    if (completedCompare !== 0)
      return completedCompare

    const timeCompare = normalizeTime(a.time) - normalizeTime(b.time)
    if (timeCompare !== 0)
      return timeCompare

    const titleCompare = (a.title ?? '').localeCompare(b.title ?? '')
    if (titleCompare !== 0)
      return titleCompare

    return (a.id ?? 0) - (b.id ?? 0)
  })
}

export const calendar = $state({
  tasks: [] as SelectCalendarTask[],
  selectedDate: todayKey(),

  selectDate(date: string) {
    if (this.selectedDate === date)
      return
    this.selectedDate = date
  },

  get tasksByDate(): Record<string, SelectCalendarTask[]> {
    return this.tasks.reduce<Record<string, SelectCalendarTask[]>>((acc, task) => {
      const key = task.date
      if (!key)
        return acc
      if (!acc[key])
        acc[key] = []
      acc[key].push(task)
      return acc
    }, {})
  },

  get selectedTasks(): SelectCalendarTask[] {
    if (!this.selectedDate)
      return []
    const list = this.tasksByDate[this.selectedDate]
    return list ? sortTasks(list) : []
  },

  async loadTasks() {
    const { database } = await useDatabase()
    const rows = await database.select().from(calendarTasks).all()
    this.tasks = sortTasks(rows)
  },

  async addTask(item: InsertCalendarTask) {
    const { database } = await useDatabase()
    await database.insert(calendarTasks).values(item)
    await this.loadTasks()
  },

  async updateTask(id: number, item: Partial<InsertCalendarTask>) {
    const { database } = await useDatabase()
    await database.update(calendarTasks).set(item).where(eq(calendarTasks.id, id))
    await this.loadTasks()
  },

  async removeTask(id: number) {
    const { database } = await useDatabase()
    await database.delete(calendarTasks).where(eq(calendarTasks.id, id))
    this.tasks = sortTasks(this.tasks.filter(task => task.id !== id))
  },

  async setTaskCompletion(id: number, completed: boolean) {
    await this.updateTask(id, { completed: completed ? 1 : 0 })
  },
})
