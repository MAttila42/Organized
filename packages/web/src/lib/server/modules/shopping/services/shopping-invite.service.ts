import type { ShoppingInvite, ShoppingMember } from '../repositories'
import {
  createShoppingInvite,
  deleteShoppingInviteById,
  findShoppingInviteByCode,
  findShoppingInvitesByListId,
  incrementShoppingInviteUsedCount,
} from '../repositories/shopping-invite.repository'
import { findShoppingListById } from '../repositories/shopping-list.repository'
import {
  createShoppingMember,
  findShoppingMemberByListAndInstance,
} from '../repositories/shopping-member.repository'
import { ShoppingServiceError } from './errors'
import { requireOwnedList } from './list-guards'

export interface CreateInviteDto {
  maxUses?: number | null
  expiresAt?: string | null
}

export async function createInvite(
  listId: string,
  instanceId: string,
  data: CreateInviteDto,
): Promise<ShoppingInvite> {
  await requireOwnedList(listId, instanceId)

  const invite = await createShoppingInvite({
    listId,
    maxUses: data.maxUses ?? null,
    expiresAt: data.expiresAt ?? null,
  })

  if (!invite)
    throw new ShoppingServiceError(500, 'Failed to create invite')

  return invite
}

export async function getInvitesByListId(
  listId: string,
  instanceId: string,
): Promise<ShoppingInvite[]> {
  await requireOwnedList(listId, instanceId)
  return findShoppingInvitesByListId(listId)
}

export async function deleteInvite(inviteId: string, instanceId: string): Promise<void> {
  const { findShoppingInviteById } = await import('../repositories/shopping-invite.repository')
  const invite = await findShoppingInviteById(inviteId)

  if (!invite)
    throw new ShoppingServiceError(404, 'Invite not found')

  await requireOwnedList(invite.listId, instanceId)

  const deleted = await deleteShoppingInviteById(invite.id)
  if (!deleted)
    throw new ShoppingServiceError(500, 'Failed to delete invite')
}

export async function acceptInvite(code: string, instanceId: string): Promise<ShoppingMember> {
  const invite = await findShoppingInviteByCode(code.toUpperCase())
  if (!invite)
    throw new ShoppingServiceError(404, 'Invite not found or expired')

  // Check expiration
  if (invite.expiresAt && new Date(invite.expiresAt) < new Date())
    throw new ShoppingServiceError(410, 'Invite has expired')

  // Check usage limit
  if (invite.maxUses !== null && invite.usedCount >= invite.maxUses)
    throw new ShoppingServiceError(410, 'Invite has reached its usage limit')

  // Check if list still exists
  const list = await findShoppingListById(invite.listId)
  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list no longer exists')

  // Check if instance is already a member
  const existingMember = await findShoppingMemberByListAndInstance(invite.listId, instanceId)
  if (existingMember)
    throw new ShoppingServiceError(409, 'You are already a member of this list')

  // Check if instance is the owner
  if (list.ownerInstanceId === instanceId)
    throw new ShoppingServiceError(409, 'You are the owner of this list')

  // Create membership
  const member = await createShoppingMember({
    listId: invite.listId,
    instanceId,
  })

  if (!member)
    throw new ShoppingServiceError(500, 'Failed to join list')

  // Increment usage count
  await incrementShoppingInviteUsedCount(invite.id)

  return member
}

export interface InviteInfo {
  listId: string
  listName: string
}

export async function getInviteInfo(code: string): Promise<InviteInfo> {
  const invite = await findShoppingInviteByCode(code.toUpperCase())
  if (!invite)
    throw new ShoppingServiceError(404, 'Invite not found')

  if (invite.expiresAt && new Date(invite.expiresAt) < new Date())
    throw new ShoppingServiceError(410, 'Invite has expired')

  if (invite.maxUses !== null && invite.usedCount >= invite.maxUses)
    throw new ShoppingServiceError(410, 'Invite has reached its usage limit')

  const list = await findShoppingListById(invite.listId)
  if (!list)
    throw new ShoppingServiceError(404, 'Shopping list no longer exists')

  return {
    listId: list.id,
    listName: list.name,
  }
}
