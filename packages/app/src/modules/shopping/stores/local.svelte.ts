import type { InsertLocalItem, SelectLocalItem } from '$lib/database/schema/shopping'
import { useDatabase } from '$lib/database'
import { shoppingLocalItems } from '$lib/database/schema/shopping'
import { eq } from 'drizzle-orm'

export interface LocalItem extends SelectLocalItem {
  source: 'local'
}

export const localStore = $state({
  items: [] as LocalItem[],
  initialized: false,

  async initialize() {
    if (this.initialized)
      return
    await this.load()
    this.initialized = true
  },

  async load() {
    const { database } = await useDatabase()
    const rows = await database.select().from(shoppingLocalItems).all()
    this.items = rows.map(row => ({ ...row, source: 'local' as const }))
  },

  async add(input: { name: string, quantity?: string | null, unit?: string | null, description?: string | null }) {
    const payload: InsertLocalItem = {
      name: input.name.trim(),
      quantity: input.quantity?.trim() || null,
      unit: input.unit?.trim() || null,
      description: input.description?.trim() || null,
      inCart: 0,
    }
    const { database } = await useDatabase()
    await database.insert(shoppingLocalItems).values(payload)
    await this.load()
  },

  async remove(id: number) {
    const { database } = await useDatabase()
    await database.delete(shoppingLocalItems).where(eq(shoppingLocalItems.id, id))
    this.items = this.items.filter(item => item.id !== id)
  },

  async toggleCart(id: number) {
    const item = this.items.find(i => i.id === id)
    if (!item)
      return

    const nextInCart = item.inCart ? 0 : 1
    const { database } = await useDatabase()
    await database.update(shoppingLocalItems).set({ inCart: nextInCart }).where(eq(shoppingLocalItems.id, id))
    this.items = this.items.map(i => i.id === id ? { ...i, inCart: nextInCart } : i)
  },

  get activeItems(): LocalItem[] {
    return this.items.filter((i: LocalItem) => !i.inCart)
  },

  get cartItems(): LocalItem[] {
    return this.items.filter((i: LocalItem) => !!i.inCart)
  },
})
