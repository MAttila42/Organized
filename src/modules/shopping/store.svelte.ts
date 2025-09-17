import type { SelectShoppingList } from '$lib/database/schema/grocery'

export const shopping = $state({
  items: [] as SelectShoppingList[],
})
