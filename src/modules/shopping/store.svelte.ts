import type { SelectShoppingList } from '$lib/database/schema/shopping'
import { useDatabase } from '$lib/database'
import { shoppingList } from '$lib/database/schema/shopping'
import { eq } from 'drizzle-orm'

export const shopping = $state({
  items: [] as (SelectShoppingList)[],

  async addItem(item: Omit<SelectShoppingList, 'id'>) {
    const { database } = await useDatabase()
    const [result] = await database.insert(shoppingList).values(item).returning()
    this.items.push(result)
  },

  async removeItem(id: number) {
    const { database } = await useDatabase()
    await database.delete(shoppingList).where(eq(shoppingList.id, id))
    this.items = this.items.filter(item => item.id !== id)
  },

  async loadItems() {
    const { database } = await useDatabase()
    this.items = await database.select().from(shoppingList).all()
  },
})
