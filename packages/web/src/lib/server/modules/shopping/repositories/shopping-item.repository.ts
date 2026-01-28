import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { db } from '$lib/server/db'
import { shoppingItems } from '$lib/server/db/schema/shopping'
import { eq } from 'drizzle-orm'

export type ShoppingItem = InferSelectModel<typeof shoppingItems>
export type NewShoppingItem = InferInsertModel<typeof shoppingItems>

export type CreateShoppingItemInput = Pick<NewShoppingItem, 'listId' | 'name' | 'quantity' | 'unit' | 'description'>
export type UpdateShoppingItemInput = Partial<Pick<NewShoppingItem, 'name' | 'quantity' | 'unit' | 'description' | 'inCart'>>

function withTimestamps<T extends Record<string, unknown>>(data: T) {
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  }
}

export async function createShoppingItem(data: CreateShoppingItemInput) {
  const [item] = await db.insert(shoppingItems).values(data).returning()
  return item ?? null
}

export async function findShoppingItemById(id: string) {
  const [item] = await db.select().from(shoppingItems).where(eq(shoppingItems.id, id))
  return item ?? null
}

export function findShoppingItemsByListId(listId: string) {
  return db.select().from(shoppingItems).where(eq(shoppingItems.listId, listId))
}

export async function updateShoppingItemById(id: string, data: UpdateShoppingItemInput) {
  if (!data || Object.keys(data).length === 0)
    return findShoppingItemById(id)

  const [item] = await db
    .update(shoppingItems)
    .set(withTimestamps(data))
    .where(eq(shoppingItems.id, id))
    .returning()

  return item ?? null
}

export async function deleteShoppingItemById(id: string) {
  const [deleted] = await db
    .delete(shoppingItems)
    .where(eq(shoppingItems.id, id))
    .returning({ id: shoppingItems.id })

  return Boolean(deleted)
}
