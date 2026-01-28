import type { ShoppingItem, ShoppingList, UpdateShoppingListInput } from '../repositories'
import { findShoppingItemsByListId } from '../repositories/shopping-item.repository'
import {
  createShoppingList,
  deleteShoppingListById,
  findShoppingListsByOwnerInstance,
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

export async function createList(ownerInstanceId: string, data: CreateShoppingListDto): Promise<ShoppingList> {
  const list = await createShoppingList({
    ownerInstanceId,
    name: data.name,
    description: data.description ?? null,
    color: data.color ?? null,
  })

  if (!list)
    throw new ShoppingServiceError(500, 'Failed to create shopping list')

  return list
}

export async function updateList(listId: string, instanceId: string, data: UpdateShoppingListDto): Promise<ShoppingList> {
  await requireOwnedList(listId, instanceId)

  const updates = buildListUpdatePayload(data)
  const next = await updateShoppingListById(listId, updates)
  if (!next)
    throw new ShoppingServiceError(500, 'Failed to update shopping list')

  return next
}

export async function rotateAccessToken(listId: string, instanceId: string): Promise<ShoppingList> {
  await requireOwnedList(listId, instanceId)

  const accessToken = crypto.randomUUID().replaceAll('-', '')
  const next = await updateShoppingListById(listId, { accessToken })

  if (!next)
    throw new ShoppingServiceError(500, 'Failed to rotate access token')

  return next
}

export async function deleteList(listId: string, instanceId: string): Promise<void> {
  await requireOwnedList(listId, instanceId)

  const deleted = await deleteShoppingListById(listId)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to delete shopping list')
}

export async function getListsByOwner(instanceId: string): Promise<ShoppingList[]> {
  return findShoppingListsByOwnerInstance(instanceId)
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
