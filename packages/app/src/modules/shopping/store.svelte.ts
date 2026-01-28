import { isOnline } from './api'
import { localStore } from './stores/local.svelte'
import { sharedStore } from './stores/shared.svelte'

export type ListMode = 'local' | 'shared'

export type ShoppingItem
  = | (typeof localStore.items)[number]
    | (typeof sharedStore.items)[number]

export const shopping = $state({
  mode: 'local' as ListMode,
  initialized: false,

  get isOnline() {
    return isOnline()
  },

  get isSharedMode() {
    return this.mode === 'shared' && sharedStore.currentListId !== null
  },

  get local() {
    return localStore
  },

  get shared() {
    return sharedStore
  },

  get items(): ShoppingItem[] {
    return this.isSharedMode ? sharedStore.items : localStore.items
  },

  get activeItems(): ShoppingItem[] {
    return this.isSharedMode ? sharedStore.activeItems : localStore.activeItems
  },

  get cartItems(): ShoppingItem[] {
    return this.isSharedMode ? sharedStore.cartItems : localStore.cartItems
  },

  get canEdit() {
    // All members can edit (no role restrictions)
    return true
  },

  async initialize() {
    if (this.initialized)
      return

    await localStore.initialize()

    if (this.isOnline)
      await sharedStore.loadMemberships()

    this.initialized = true
  },

  async useLocal() {
    this.mode = 'local'
    sharedStore.clear()
  },

  async useShared(listId: string) {
    if (!this.isOnline)
      throw new Error('Shared lists require an internet connection')

    this.mode = 'shared'
    await sharedStore.selectList(listId)
  },

  async addItem(input: { name: string, quantity?: string | null, unit?: string | null, description?: string | null }) {
    if (this.isSharedMode)
      await sharedStore.addItem(input)

    else
      await localStore.add(input)
  },

  async removeItem(id: number | string) {
    if (this.isSharedMode)
      await sharedStore.removeItem(String(id))

    else
      await localStore.remove(Number(id))
  },

  async toggleCart(id: number | string) {
    if (this.isSharedMode)
      await sharedStore.toggleCart(String(id))

    else
      await localStore.toggleCart(Number(id))
  },
})

// Re-export types for components
export type { LocalItem } from './stores/local.svelte'
export type { SharedItem } from './stores/shared.svelte'
