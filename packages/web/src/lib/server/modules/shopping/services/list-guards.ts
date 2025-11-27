import type { ShoppingList } from '../repositories'
import { findShoppingListByAccessToken, findShoppingListById } from '../repositories'
import { ShoppingServiceError } from './errors'

export async function requireListByAccessToken(accessToken: string): Promise<ShoppingList> {
  if (!accessToken)
    throw new ShoppingServiceError(400, 'Access token is required')

  const list = await findShoppingListByAccessToken(accessToken)
  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list not found')

  return list
}

export async function requireOwnedList(listId: string, ownerId: string): Promise<ShoppingList> {
  const list = await findShoppingListById(listId)

  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list not found')

  if (list.ownerId !== ownerId)
    throw new ShoppingServiceError(403, 'You do not have access to this shopping list')

  return list
}
