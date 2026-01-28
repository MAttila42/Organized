import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { db } from '$lib/server/db'
import { shoppingListMembers } from '$lib/server/db/schema/shopping'
import { and, eq } from 'drizzle-orm'

export type ShoppingMember = InferSelectModel<typeof shoppingListMembers>
export type NewShoppingMember = InferInsertModel<typeof shoppingListMembers>

export type CreateShoppingMemberInput = Pick<NewShoppingMember, 'listId' | 'instanceId'>

export async function createShoppingMember(data: CreateShoppingMemberInput) {
  const [member] = await db.insert(shoppingListMembers).values(data).returning()
  return member ?? null
}

export async function findShoppingMemberById(id: string) {
  const [member] = await db.select().from(shoppingListMembers).where(eq(shoppingListMembers.id, id))
  return member ?? null
}

export async function findShoppingMemberByListAndInstance(listId: string, instanceId: string) {
  const [member] = await db
    .select()
    .from(shoppingListMembers)
    .where(and(eq(shoppingListMembers.listId, listId), eq(shoppingListMembers.instanceId, instanceId)))
  return member ?? null
}

export async function findShoppingMembersByListId(listId: string) {
  return db.select().from(shoppingListMembers).where(eq(shoppingListMembers.listId, listId))
}

export async function findShoppingMembershipsByInstanceId(instanceId: string) {
  return db.select().from(shoppingListMembers).where(eq(shoppingListMembers.instanceId, instanceId))
}

export async function deleteShoppingMemberById(id: string) {
  const [result] = await db
    .delete(shoppingListMembers)
    .where(eq(shoppingListMembers.id, id))
    .returning({ id: shoppingListMembers.id })
  return Boolean(result)
}
