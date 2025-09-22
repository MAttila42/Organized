import type { InsertClasses, SelectClasses } from '$lib/database/schema/study'
import { useDatabase } from '$lib/database'
import { classes } from '$lib/database/schema/study'
import { eq } from 'drizzle-orm'

export const study = $state({
  items: [] as (SelectClasses)[],

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
