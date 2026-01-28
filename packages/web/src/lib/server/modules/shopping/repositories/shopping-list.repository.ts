import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { db } from '$lib/server/db'
import { shoppingLists } from '$lib/server/db/schema/shopping'
import { eq } from 'drizzle-orm'

export type ShoppingList = InferSelectModel<typeof shoppingLists>
export type NewShoppingList = InferInsertModel<typeof shoppingLists>

export type CreateShoppingListInput = Pick<NewShoppingList, 'ownerInstanceId' | 'name' | 'description' | 'color'>
export type UpdateShoppingListInput = Partial<Pick<NewShoppingList, 'name' | 'description' | 'color' | 'accessToken'>>

function withTimestamps<T extends Record<string, unknown>>(data: T) {
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  }
}

export async function createShoppingList(data: CreateShoppingListInput) {
  const [list] = await db.insert(shoppingLists).values(data).returning()
  return list ?? null
}

export async function findShoppingListById(id: string) {
  const [list] = await db.select().from(shoppingLists).where(eq(shoppingLists.id, id))
  return list ?? null
}

export async function findShoppingListByAccessToken(accessToken: string) {
  const [list] = await db.select().from(shoppingLists).where(eq(shoppingLists.accessToken, accessToken))
  return list ?? null
}

export async function findShoppingListsByOwnerInstance(ownerInstanceId: string) {
  return db.select().from(shoppingLists).where(eq(shoppingLists.ownerInstanceId, ownerInstanceId))
}

export async function updateShoppingListById(id: string, data: UpdateShoppingListInput) {
  if (!data || Object.keys(data).length === 0)
    return findShoppingListById(id)

  const [list] = await db
    .update(shoppingLists)
    .set(withTimestamps(data))
    .where(eq(shoppingLists.id, id))
    .returning()

  return list ?? null
}

export async function deleteShoppingListById(id: string) {
  const [result] = await db
    .delete(shoppingLists)
    .where(eq(shoppingLists.id, id))
    .returning({ id: shoppingLists.id })

  return Boolean(result)
}
