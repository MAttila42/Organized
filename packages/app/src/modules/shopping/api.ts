import { buildInstanceHeaders, getApiClient } from '$lib/api/client'
import { appStore } from '$lib/stores/app.svelte'

/**
 * Check if online features are available
 */
export function isOnline(): boolean {
  return Boolean(appStore.apiUrl?.trim() && appStore.instanceToken?.trim())
}

/**
 * Get the shopping API namespace.
 * Eden can't infer dynamically mounted module routes, so we cast carefully.
 */
function getShoppingApi() {
  const client = getApiClient() as any
  if (client?.api?.modules?.shopping)
    return client.api.modules.shopping
  if (client?.modules?.shopping)
    return client.modules.shopping
  throw new Error('Shopping API unavailable')
}

// ============ Types ============

export interface ShoppingListData {
  id: string
  name: string
  description: string | null
  color: string | null
  accessToken?: string | null
  ownerInstanceId?: string
}

export interface ShoppingItemData {
  id: string
  listId: string
  name: string
  quantity: string | null
  unit: string | null
  description: string | null
  inCart: number
  createdAt?: string | null
  updatedAt?: string | null
}

export interface ListWithItems {
  list: ShoppingListData
  items: ShoppingItemData[]
}

export interface InviteInfo {
  listId: string
  listName: string
}

export interface InviteData {
  id: string
  listId: string
  code: string
  maxUses: number | null
  usedCount: number
  expiresAt: string | null
  createdAt: string
}

export interface MemberData {
  id: string
  listId: string
  instanceId: string
  joinedAt: string
}

// ============ Lists ============

export async function fetchMyLists(): Promise<ShoppingListData[]> {
  const api = getShoppingApi()
  const response = await api.lists.get({
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to fetch lists')
  return response.data?.lists ?? []
}

export async function fetchListByAccessToken(accessToken: string): Promise<ListWithItems> {
  const api = getShoppingApi()
  const response = await api.lists.access.get({
    headers: buildInstanceHeaders({ 'x-shopping-access-token': accessToken }),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to fetch list')
  return response.data as ListWithItems
}

export async function createList(data: { name: string, description?: string, color?: string }): Promise<ShoppingListData> {
  const api = getShoppingApi()
  const response = await api.lists.post(data, {
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to create list')
  return response.data!.list as ShoppingListData
}

// ============ Items ============

export async function createItem(accessToken: string, data: { name: string, quantity?: string, unit?: string, description?: string }): Promise<ShoppingItemData> {
  const api = getShoppingApi()
  const response = await api.lists.items.post(data, {
    headers: buildInstanceHeaders({ 'x-shopping-access-token': accessToken }),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to create item')
  return response.data!.item as ShoppingItemData
}

export async function updateItem(accessToken: string, itemId: string, data: { name?: string, quantity?: string, unit?: string, description?: string, inCart?: number }): Promise<ShoppingItemData> {
  const api = getShoppingApi()
  const response = await api.lists.items({ itemId }).patch(data, {
    headers: buildInstanceHeaders({ 'x-shopping-access-token': accessToken }),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to update item')
  return response.data!.item as ShoppingItemData
}

export async function deleteItem(accessToken: string, itemId: string): Promise<void> {
  const api = getShoppingApi()
  const response = await api.lists.items({ itemId }).delete({
    headers: buildInstanceHeaders({ 'x-shopping-access-token': accessToken }),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to delete item')
}

// ============ Invites ============

export async function getInviteInfo(code: string): Promise<InviteInfo> {
  const api = getShoppingApi()
  const response = await api.invites({ code }).get()
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Invalid invite code')
  return response.data!.invite as InviteInfo
}

export async function acceptInvite(code: string): Promise<MemberData> {
  const api = getShoppingApi()
  const response = await api.invites({ code }).accept.post({}, {
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to accept invite')
  return response.data!.member as MemberData
}

export async function createInvite(listId: string, data?: { maxUses?: number, expiresAt?: string }): Promise<InviteData> {
  const api = getShoppingApi()
  const response = await api.lists({ listId }).invites.post(data ?? {}, {
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to create invite')
  return response.data!.invite as InviteData
}

export async function getListInvites(listId: string): Promise<InviteData[]> {
  const api = getShoppingApi()
  const response = await api.lists({ listId }).invites.get({
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to fetch invites')
  return response.data?.invites ?? []
}

export async function deleteInvite(inviteId: string): Promise<void> {
  const api = getShoppingApi()
  const response = await api.invites({ inviteId }).delete({
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to delete invite')
}

// ============ Members ============

export async function getListMembers(listId: string): Promise<MemberData[]> {
  const api = getShoppingApi()
  const response = await api.lists({ listId }).members.get({
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to fetch members')
  return response.data?.members ?? []
}

export async function leaveList(listId: string): Promise<void> {
  const api = getShoppingApi()
  const response = await api.lists({ listId }).members.leave.delete({
    headers: buildInstanceHeaders(),
  })
  if (response.error)
    throw new Error(response.error.value?.message ?? 'Failed to leave list')
}
