import type { ShoppingItem, UpdateShoppingItemInput } from '../repositories'
import {
  createShoppingItem,
  deleteShoppingItemById,
  findShoppingItemById,
  updateShoppingItemById,
} from '../repositories/shopping-item.repository'
import { ShoppingServiceError } from './errors'
import { requireListByAccessToken } from './list-guards'

export interface CreateShoppingItemDto {
  name: string
  quantity?: string | null
  unit?: string | null
  description?: string | null
}

export type UpdateShoppingItemDto = Partial<CreateShoppingItemDto>

export async function createItem(accessToken: string, data: CreateShoppingItemDto): Promise<ShoppingItem> {
  const list = await requireListByAccessToken(accessToken)
  const item = await createShoppingItem({
    listId: list.id,
    name: data.name,
    quantity: data.quantity ?? null,
    unit: data.unit ?? null,
    description: data.description ?? null,
  })

  if (!item)
    throw new ShoppingServiceError(500, 'Failed to create shopping item')

  return item
}

export async function updateItem(accessToken: string, itemId: string, data: UpdateShoppingItemDto): Promise<ShoppingItem> {
  const list = await requireListByAccessToken(accessToken)
  const existing = await findShoppingItemById(itemId)

  if (!existing || existing.listId !== list.id)
    throw new ShoppingServiceError(404, 'Shopping item not found')

  const updates = buildItemUpdatePayload(data)
  const updated = await updateShoppingItemById(itemId, updates)
  if (!updated)
    throw new ShoppingServiceError(500, 'Failed to update shopping item')

  return updated
}

export async function deleteItem(accessToken: string, itemId: string): Promise<void> {
  const list = await requireListByAccessToken(accessToken)
  const existing = await findShoppingItemById(itemId)

  if (!existing || existing.listId !== list.id)
    throw new ShoppingServiceError(404, 'Shopping item not found')

  const deleted = await deleteShoppingItemById(itemId)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to delete shopping item')
}

function buildItemUpdatePayload(data: UpdateShoppingItemDto): UpdateShoppingItemInput {
  const updates: UpdateShoppingItemInput = {}

  if (data.name !== undefined)
    updates.name = data.name

  if (data.quantity !== undefined)
    updates.quantity = data.quantity ?? null

  if (data.unit !== undefined)
    updates.unit = data.unit ?? null

  if (data.description !== undefined)
    updates.description = data.description ?? null

  return updates
}
