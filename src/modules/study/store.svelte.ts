import type { InsertClasses, SelectClasses } from '$lib/database/schema/study'
import { useDatabase } from '$lib/database'
import { classes } from '$lib/database/schema/study'
import { eq } from 'drizzle-orm'

export const study = $state({
  items: [] as (SelectClasses)[],
  // Day selection state
  selectedDay: (() => {
    // JS getDay(): 0=Sunday ... 6=Saturday. Convert to 0=Monday ... 6=Sunday used in schema.
    const d = new Date().getDay()
    return d === 0 ? 6 : d - 1
  })(),

  setDay(day: number) {
    this.selectedDay = day
  },
  nextDay() {
    this.selectedDay = (this.selectedDay + 1) % 7
  },
  prevDay() {
    this.selectedDay = (this.selectedDay + 6) % 7
  },
  get neighborDays(): { prev: number, current: number, next: number } {
    return {
      prev: (this.selectedDay + 6) % 7,
      current: this.selectedDay,
      next: (this.selectedDay + 1) % 7,
    }
  },

  get filteredItems(): SelectClasses[] {
    return this.items
      .filter(i => i.day == null || i.day === this.selectedDay)
      .sort((a, b) => (a.schedule ?? 0) - (b.schedule ?? 0))
  },

  async addItem(item: InsertClasses) {
    const { database } = await useDatabase()
    await database.insert(classes).values(item)
    await this.loadItems()
  },

  async updateItem(id: number, item: Partial<InsertClasses>) {
    const { database } = await useDatabase()
    await database.update(classes).set(item).where(eq(classes.id, id))
    await this.loadItems()
  },

  async removeItem(id: number) {
    const { database } = await useDatabase()
    await database.delete(classes).where(eq(classes.id, id))
    this.items = this.items.filter(item => item.id !== id)
  },

  async loadItems() {
    const { database } = await useDatabase()
    this.items = await database.select().from(classes).all()
  },
})
