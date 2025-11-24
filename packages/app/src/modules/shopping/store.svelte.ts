import type { InsertShoppingList, SelectShoppingList } from '$lib/database/schema/shopping'
import { useDatabase } from '$lib/database'
import { shoppingList } from '$lib/database/schema/shopping'
import { eq } from 'drizzle-orm'

export const shopping = $state({
  items: [] as (SelectShoppingList)[],

  async addItem(item: InsertShoppingList) {
    const { database } = await useDatabase()
    await database
      .insert(shoppingList)
      .values({
        ...item,
        inCart: 0,
      })
    await this.loadItems()
  },

  async removeItem(id: number) {
    const { database } = await useDatabase()
    await database.delete(shoppingList).where(eq(shoppingList.id, id))
    this.items = this.items.filter(item => item.id !== id)
  },

  async toggleCart(id: number) {
    const currentItem = this.items.find(item => item.id === id)
    if (!currentItem)
      return

    const nextInCart = currentItem.inCart ? 0 : 1
    const { database } = await useDatabase()
    await database
      .update(shoppingList)
      .set({ inCart: nextInCart })
      .where(eq(shoppingList.id, id))

    this.items = this.items.map(item => (item.id === id ? { ...item, inCart: nextInCart } : item))
  },

  async loadItems() {
    const { database } = await useDatabase()
    this.items = await database.select().from(shoppingList).all()
  },
})
