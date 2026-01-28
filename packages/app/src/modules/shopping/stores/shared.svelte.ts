import type { InsertMembership, SelectMembership } from '$lib/database/schema/shopping'
import { useDatabase } from '$lib/database'
import { shoppingMemberships } from '$lib/database/schema/shopping'
import { eq } from 'drizzle-orm'
import * as api from '../api'

export interface SharedItem {
  source: 'shared'
  id: string
  listId: string
  name: string
  quantity: string | null
  unit: string | null
  description: string | null
  inCart: number
}

export type Membership = SelectMembership

export const sharedStore = $state({
  memberships: [] as SelectMembership[],
  currentListId: null as string | null,
  items: [] as SharedItem[],
  accessToken: null as string | null,
  loading: false,
  error: null as string | null,

  get currentMembership(): SelectMembership | null {
    if (!this.currentListId)
      return null
    return this.memberships.find(m => m.listId === this.currentListId) ?? null
  },

  get isOwner() {
    return this.currentMembership?.isOwner === 1
  },

  get activeItems(): SharedItem[] {
    return this.items.filter((i: SharedItem) => !i.inCart)
  },

  get cartItems(): SharedItem[] {
    return this.items.filter((i: SharedItem) => !!i.inCart)
  },

  async loadMemberships() {
    const { database } = await useDatabase()
    this.memberships = await database.select().from(shoppingMemberships).all()
  },

  async selectList(listId: string) {
    const membership = this.memberships.find(m => m.listId === listId)
    if (!membership) {
      this.error = 'List not found in local cache'
      return
    }

    this.currentListId = listId
    this.loading = true
    this.error = null

    try {
      // Fetch owned lists to get access token
      const lists = await api.fetchMyLists()
      const list = lists.find(l => l.id === listId)
      if (!list?.accessToken)
        throw new Error('Could not retrieve access token for this list')

      this.accessToken = list.accessToken

      const data = await api.fetchListByAccessToken(this.accessToken)
      this.items = data.items.map(item => ({ ...item, source: 'shared' as const }))

      // Update cached metadata
      await this.updateMembershipCache(data.list)
    }
    catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to load list'
      this.items = []
    }
    finally {
      this.loading = false
    }
  },

  async updateMembershipCache(list: api.ShoppingListData) {
    const { database } = await useDatabase()
    await database.update(shoppingMemberships).set({
      name: list.name,
      description: list.description,
      color: list.color,
      syncedAt: Date.now(),
    }).where(eq(shoppingMemberships.listId, list.id))
    await this.loadMemberships()
  },

  async createList(data: { name: string, description?: string, color?: string }): Promise<api.ShoppingListData> {
    const list = await api.createList(data)

    const { database } = await useDatabase()
    const payload: InsertMembership = {
      listId: list.id,
      name: list.name,
      description: list.description ?? null,
      color: list.color ?? null,
      isOwner: 1,
      syncedAt: Date.now(),
    }
    await database.insert(shoppingMemberships).values(payload)

    await this.loadMemberships()
    this.currentListId = list.id
    this.accessToken = list.accessToken ?? null
    this.items = []

    return list
  },

  async joinByCode(code: string): Promise<api.InviteInfo> {
    const info = await api.getInviteInfo(code)
    await api.acceptInvite(code)

    const { database } = await useDatabase()
    const payload: InsertMembership = {
      listId: info.listId,
      name: info.listName,
      description: null,
      color: null,
      isOwner: 0,
      syncedAt: Date.now(),
    }
    await database.insert(shoppingMemberships).values(payload)

    await this.loadMemberships()
    return info
  },

  async addItem(input: { name: string, quantity?: string | null, unit?: string | null, description?: string | null }) {
    if (!this.accessToken || !this.currentListId)
      throw new Error('No list selected')

    await api.createItem(this.accessToken, {
      name: input.name.trim(),
      quantity: input.quantity?.trim() || undefined,
      unit: input.unit?.trim() || undefined,
      description: input.description?.trim() || undefined,
    })

    await this.refresh()
  },

  async removeItem(id: string) {
    if (!this.accessToken)
      throw new Error('No list selected')

    await api.deleteItem(this.accessToken, id)
    this.items = this.items.filter(i => i.id !== id)
  },

  async toggleCart(id: string) {
    if (!this.accessToken)
      throw new Error('No list selected')

    const item = this.items.find(i => i.id === id)
    if (!item)
      return

    const nextInCart = item.inCart ? 0 : 1
    await api.updateItem(this.accessToken, id, { inCart: nextInCart })
    this.items = this.items.map(i => i.id === id ? { ...i, inCart: nextInCart } : i)
  },

  async refresh() {
    if (!this.currentListId)
      return
    await this.selectList(this.currentListId)
  },

  async leaveList(listId: string) {
    await api.leaveList(listId)
    const { database } = await useDatabase()
    await database.delete(shoppingMemberships).where(eq(shoppingMemberships.listId, listId))
    await this.loadMemberships()

    if (this.currentListId === listId) {
      this.currentListId = null
      this.items = []
      this.accessToken = null
    }
  },

  async deleteLocalMembership(listId: string) {
    const { database } = await useDatabase()
    await database.delete(shoppingMemberships).where(eq(shoppingMemberships.listId, listId))
    await this.loadMemberships()

    if (this.currentListId === listId) {
      this.currentListId = null
      this.items = []
      this.accessToken = null
    }
  },

  clear() {
    this.currentListId = null
    this.items = []
    this.accessToken = null
    this.error = null
  },
})
