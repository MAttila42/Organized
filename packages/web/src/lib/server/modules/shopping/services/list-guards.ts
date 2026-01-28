import type { ShoppingList } from '../repositories'
import { findShoppingListByAccessToken, findShoppingListById } from '../repositories/shopping-list.repository'
import { findShoppingMemberByListAndInstance } from '../repositories/shopping-member.repository'
import { ShoppingServiceError } from './errors'

export async function requireListByAccessToken(accessToken: string): Promise<ShoppingList> {
  if (!accessToken)
    throw new ShoppingServiceError(400, 'Access token is required')

  const list = await findShoppingListByAccessToken(accessToken)
  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list not found')

  return list
}

export async function requireOwnedList(listId: string, instanceId: string): Promise<ShoppingList> {
  const list = await findShoppingListById(listId)

  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list not found')

  if (list.ownerInstanceId !== instanceId)
    throw new ShoppingServiceError(403, 'You do not have access to this shopping list')

  return list
}

/**
 * Check if an instance has access to a list (owner or member).
 * Returns the list and whether the instance is the owner.
 */
export async function requireListAccess(
  listId: string,
  instanceId: string,
): Promise<{ list: ShoppingList, isOwner: boolean }> {
  const list = await findShoppingListById(listId)

  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list not found')

  // Owner always has access
  if (list.ownerInstanceId === instanceId)
    return { list, isOwner: true }

  // Check membership
  const member = await findShoppingMemberByListAndInstance(listId, instanceId)
  if (!member)
    throw new ShoppingServiceError(403, 'You do not have access to this shopping list')

  return { list, isOwner: false }
}

/**
 * Check if an instance has access to a list, returns null if no access
 */
export async function hasListAccess(
  listId: string,
  instanceId: string,
): Promise<boolean> {
  const list = await findShoppingListById(listId)
  if (!list)
    return false

  if (list.ownerInstanceId === instanceId)
    return true

  const member = await findShoppingMemberByListAndInstance(listId, instanceId)
  return !!member
}
