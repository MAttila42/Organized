import type { ShoppingMember } from '../repositories'
import {
  deleteShoppingMemberById,
  findShoppingMemberById,
  findShoppingMemberByListAndInstance,
  findShoppingMembersByListId,
} from '../repositories/shopping-member.repository'
import { ShoppingServiceError } from './errors'
import { requireListAccess, requireOwnedList } from './list-guards'

export async function getMembersByListId(
  listId: string,
  instanceId: string,
): Promise<ShoppingMember[]> {
  // Any member can see the member list
  await requireListAccess(listId, instanceId)
  return findShoppingMembersByListId(listId)
}

export async function removeMember(memberId: string, instanceId: string): Promise<void> {
  const member = await findShoppingMemberById(memberId)
  if (!member)
    throw new ShoppingServiceError(404, 'Member not found')

  // Owner can remove anyone, or member can remove themselves
  if (member.instanceId !== instanceId)
    await requireOwnedList(member.listId, instanceId)

  const deleted = await deleteShoppingMemberById(memberId)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to remove member')
}

export async function leaveList(listId: string, instanceId: string): Promise<void> {
  const { isOwner } = await requireListAccess(listId, instanceId)

  // Owner cannot leave their own list
  if (isOwner)
    throw new ShoppingServiceError(400, 'Owner cannot leave the list. Delete the list instead.')

  const member = await findShoppingMemberByListAndInstance(listId, instanceId)
  if (!member)
    throw new ShoppingServiceError(404, 'You are not a member of this list')

  const deleted = await deleteShoppingMemberById(member.id)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to leave list')
}
