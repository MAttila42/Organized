import type { SelectShoppingList } from '$lib/database/schema/shopping'
import { useDatabase } from '$lib/database'
import { shoppingList } from '$lib/database/schema/shopping'

export const shopping = $state({
  items: [] as (SelectShoppingList)[],

  async addItem(item: Omit<SelectShoppingList, 'id'>) {
    const { database } = await useDatabase()
    const [result] = await database.insert(shoppingList).values(item).returning()
    this.items.push(result)
  },
})
