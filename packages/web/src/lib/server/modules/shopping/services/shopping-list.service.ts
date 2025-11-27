import type { ShoppingItem, ShoppingList, UpdateShoppingListInput } from '../repositories'
import { findShoppingItemsByListId } from '../repositories/shopping-item.repository'
import {
  createShoppingList,
  deleteShoppingListById,
  updateShoppingListById,
} from '../repositories/shopping-list.repository'
import { ShoppingServiceError } from './errors'
import { requireListByAccessToken, requireOwnedList } from './list-guards'

export interface ShoppingListWithItems {
  list: ShoppingList
  items: ShoppingItem[]
}

export interface CreateShoppingListDto {
  name: string
  description?: string | null
  color?: string | null
}

export type UpdateShoppingListDto = Partial<CreateShoppingListDto>

export async function getListWithItems(accessToken: string): Promise<ShoppingListWithItems> {
  const list = await requireListByAccessToken(accessToken)
  const items = await findShoppingItemsByListId(list.id)

  return { list, items }
}

export async function createList(ownerId: string, data: CreateShoppingListDto): Promise<ShoppingList> {
  const list = await createShoppingList({
    ownerId,
    name: data.name,
    description: data.description ?? null,
    color: data.color ?? null,
  })

  if (!list)
    throw new ShoppingServiceError(500, 'Failed to create shopping list')

  return list
}

export async function updateList(listId: string, ownerId: string, data: UpdateShoppingListDto): Promise<ShoppingList> {
  await requireOwnedList(listId, ownerId)

  const updates = buildListUpdatePayload(data)
  const next = await updateShoppingListById(listId, updates)
  if (!next)
    throw new ShoppingServiceError(500, 'Failed to update shopping list')

  return next
}

export async function rotateAccessToken(listId: string, ownerId: string): Promise<ShoppingList> {
  await requireOwnedList(listId, ownerId)

  const accessToken = crypto.randomUUID().replaceAll('-', '')
  const next = await updateShoppingListById(listId, { accessToken })

  if (!next)
    throw new ShoppingServiceError(500, 'Failed to rotate access token')

  return next
}

export async function deleteList(listId: string, ownerId: string): Promise<void> {
  await requireOwnedList(listId, ownerId)

  const deleted = await deleteShoppingListById(listId)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to delete shopping list')
}

function buildListUpdatePayload(data: UpdateShoppingListDto): UpdateShoppingListInput {
  const updates: UpdateShoppingListInput = {}

  if (data.name !== undefined)
    updates.name = data.name

  if (data.description !== undefined)
    updates.description = data.description ?? null

  if (data.color !== undefined)
    updates.color = data.color ?? null

  return updates
}
