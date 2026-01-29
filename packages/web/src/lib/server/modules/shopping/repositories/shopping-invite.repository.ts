import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { db } from '$lib/server/db'
import { shoppingListInvites } from '$lib/server/db/schema/shopping'
import { eq } from 'drizzle-orm'

export type ShoppingInvite = InferSelectModel<typeof shoppingListInvites>
export type NewShoppingInvite = InferInsertModel<typeof shoppingListInvites>

export type CreateShoppingInviteInput = Pick<NewShoppingInvite, 'listId' | 'maxUses' | 'expiresAt'>

export async function createShoppingInvite(data: CreateShoppingInviteInput) {
  const [invite] = await db.insert(shoppingListInvites).values(data).returning()
  return invite ?? null
}

export async function findShoppingInviteById(id: string) {
  const [invite] = await db.select().from(shoppingListInvites).where(eq(shoppingListInvites.id, id))
  return invite ?? null
}

export async function findShoppingInviteByCode(code: string) {
  const [invite] = await db.select().from(shoppingListInvites).where(eq(shoppingListInvites.code, code))
  return invite ?? null
}

export async function findShoppingInvitesByListId(listId: string) {
  return db.select().from(shoppingListInvites).where(eq(shoppingListInvites.listId, listId))
}

export async function incrementShoppingInviteUsedCount(id: string) {
  const invite = await findShoppingInviteById(id)
  if (!invite)
    return null

  const [updated] = await db
    .update(shoppingListInvites)
    .set({ usedCount: invite.usedCount + 1 })
    .where(eq(shoppingListInvites.id, id))
    .returning()
  return updated ?? null
}

export async function deleteShoppingInviteById(id: string) {
  const [result] = await db
    .delete(shoppingListInvites)
    .where(eq(shoppingListInvites.id, id))
    .returning({ id: shoppingListInvites.id })
  return Boolean(result)
}
