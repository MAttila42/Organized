import { useDatabase } from '$lib/database'
import { userLinks, userModules } from '$lib/database/schema/home'
import { and, eq, gte, sql } from 'drizzle-orm'

export interface Module {
  id: string
  name: string
  description: string
  links: Link[]
  component: () => Promise<any>
}

export interface Link {
  id: string
  type: 'shortcut' | 'label'
  name: string
  moduleId: string
  description: string
  parameters: LinkParameter[]
  call: (params?: Record<string, any>) => Promise<any> | any
}

export interface LinkParameter {
  id: string
  name: string
  type: 'string' | 'number' | 'boolean'
  defaultValue?: string | number | boolean
}

export interface ModuleCard {
  name: string
  moduleId: string
  color: string
  displayOrder: number
  labels: {
    component: any
    parameters: Record<string, any>
  }[]
}

export interface Shortcut {
  id: number
  moduleId: string
  linkId: string
  icon: string
  color: string
  displayOrder: number
  call: (params: Record<string, any>) => void
  parameters: Record<string, any>
}

export const moduleStore = $state({
  modules: [] as Module[],
  moduleCards: [] as ModuleCard[],
  shortcuts: [] as Shortcut[],

  /**
   * Retrieves all enabled modules with their labels.
   *
   * @returns All enabled modules with their labels.
   */
  async loadModuleCards() {
    const { database } = await useDatabase()
    const enabledModules = await database.select()
      .from(userModules)
      .orderBy(userModules.displayOrder)
    const enabledLabels = await database.select()
      .from(userLinks)
      .where(eq(userLinks.type, 'label'))
      .orderBy(userLinks.displayOrder)

    this.moduleCards = await Promise.all(enabledModules.map(async (m) => {
      const moduleDef = this.modules.find(mod => mod.id === m.moduleId)!
      const labelsForModule = enabledLabels.filter(l => l.moduleId === m.moduleId)
      const resolved = await Promise.all(labelsForModule.map(async (l) => {
        const link = moduleDef.links.find(link => link.id === l.linkId)!
        const mod = await link.call()
        return {
          component: mod?.default,
          parameters: l.parameters ?? {},
        }
      }))

      return {
        name: moduleDef.name,
        moduleId: m.moduleId,
        color: m.color,
        displayOrder: m.displayOrder,
        labels: resolved,
      } as ModuleCard
    }))
  },

  async loadShortcuts() {
    const { database } = await useDatabase()
    const enabledShortcuts = await database.select()
      .from(userLinks)
      .where(eq(userLinks.type, 'shortcut'))
      .orderBy(userLinks.displayOrder)

    this.shortcuts = enabledShortcuts.map(s => ({
      id: s.id,
      moduleId: s.moduleId,
      linkId: s.linkId,
      icon: s.icon!,
      color: s.color,
      displayOrder: s.displayOrder,
      call: this.modules
        .find(m => m.id === s.moduleId)!
        .links
        .find(link => link.id === s.linkId)!.call,
      parameters: s.parameters ?? {},
    }))
  },

  /**
   * Enables a module.
   *
   * This will insert the module into the database and adjust the display order of existing modules.
   *
   * @param moduleId The module identifier to enable.
   * @param color The color to assign to the module.
   * @param position The display order position for the module.
   */
  async addModuleCard(
    moduleId: string,
    color?: string,
    position?: number,
  ) {
    if (!position)
      position = this.moduleCards[this.moduleCards.length - 1]?.displayOrder + 1 || 0
    if (!color)
      color = '#FFFFFF'

    const { database } = await useDatabase()
    const result = await database.select()
      .from(userModules)
      .where(eq(userModules.displayOrder, position))

    if (result.length > 0) {
      database.update(userModules)
        .set({ displayOrder: sql`${userModules.displayOrder} + 1` })
        .where(gte(userModules.displayOrder, position))
    }

    await database.insert(userModules).values({
      moduleId,
      color,
      displayOrder: position,
    })

    await this.loadModuleCards()
  },

  /**
   * Disables a module.
   *
   * @param moduleId The module identifier to disable.
   */
  async removeModuleCard(moduleId: string) {
    const { database } = await useDatabase()
    await database.delete(userModules)
      .where(eq(userModules.moduleId, moduleId))

    await database.delete(userLinks)
      .where(eq(userLinks.moduleId, moduleId))

    await this.loadModuleCards()
    await this.loadShortcuts()
  },

  /**
   * Retrieves all labels for a module.
   *
   * @param moduleId The module identifier to get labels for.
   * @returns An array of labels for the specified module.
   */
  getLabels(moduleId: string) {
    return this.modules
      .find(m => m.id === moduleId)
      ?.links
      .filter(l => l.type === 'label')
      .sort((a, b) => a.name.localeCompare(b.name)) || []
  },

  /**
   * Retrieves all possible actions for a module.
   *
   * @param moduleId The module identifier to get action for.
   * @returns An array of actions for the specified module.
   */
  getActions(moduleId: string) {
    return this.modules
      .find(m => m.id === moduleId)
      ?.links
      .filter(l => l.type === 'shortcut')
      .sort((a, b) => a.name.localeCompare(b.name)) || []
  },

  /**
   * Retrieves all enabled labels for a module.
   *
   * @param moduleId The module identifier to get enabled labels for.
   * @returns An array of enabled labels for the specified module.
   */
  async getEnabledLabels(moduleId: string) {
    const { database } = await useDatabase()
    const result = await database.select()
      .from(userLinks)
      .where(and(
        eq(userLinks.moduleId, moduleId),
        eq(userLinks.type, 'label'),
      ))
      .orderBy(userLinks.displayOrder)

    return result.map(l => ({
      id: l.id,
      linkId: l.linkId,
      parameters: l.parameters,
    }))
  },

  /**
   * Adds a new label to a module.
   *
   * This will insert the label into the database and adjust the display order of existing labels.
   *
   * @param moduleId The module identifier to add the label to.
   * @param linkId The link identifier for the label.
   * @param parameters The parameters for the label.
   * @param position The position in the module's label list for the label.
   */
  async addLabel(
    moduleId: string,
    linkId: string,
    parameters: Record<string, any>,
    position: number,
  ) {
    const { database } = await useDatabase()
    const result = await database.select()
      .from(userLinks)
      .where(and(
        eq(userLinks.moduleId, moduleId),
        eq(userLinks.displayOrder, position),
      ))

    if (result.length > 0) {
      await database.update(userLinks)
        .set({ displayOrder: sql`${userLinks.displayOrder} + 1` })
        .where(and(
          eq(userLinks.moduleId, moduleId),
          gte(userLinks.displayOrder, position),
        ))
    }

    await database.insert(userLinks).values({
      linkId,
      type: 'label',
      displayOrder: position,
      parameters,
      moduleId,
    })
    // Keep module cards in sync when labels mutate
    await this.loadModuleCards()
  },

  /**
   * Adds a new shortcut to quick actions.
   *
   * @param moduleId The module identifier the shortcut is for.
   * @param linkId The link identifier the shortcut invokes.
   * @param parameters The parameters for the shortcut call.
   * @param icon The icon for the shortcut.
   * @param color The color for the shortcut.
   * @param position The position in the shortcut list.
   */
  async addShortcut(
    moduleId: string,
    linkId: string,
    parameters: Record<string, any>,
    icon: string,
    color?: string,
    position?: number,
  ) {
    if (!position)
      position = this.shortcuts[this.shortcuts.length - 1]?.displayOrder + 1 || 0
    if (!color)
      color = '#FFFFFF'

    const { database } = await useDatabase()
    const result = await database.select()
      .from(userLinks)
      .where(and(
        eq(userLinks.moduleId, moduleId),
        eq(userLinks.displayOrder, position),
      ))

    if (result.length > 0) {
      database.update(userLinks)
        .set({ displayOrder: sql`${userLinks.displayOrder} + 1` })
        .where(and(
          eq(userLinks.moduleId, moduleId),
          gte(userLinks.displayOrder, position),
        ))
    }

    await database.insert(userLinks).values({
      linkId,
      type: 'shortcut',
      displayOrder: position,
      icon,
      color,
      parameters,
      moduleId,
    })

    await this.loadShortcuts()
  },

  /**
   * Removes a link (shortcut or label) from the home screen.
   *
   * @param id The identifier of the link to remove.
   */
  async removeLink(id: number) {
    const { database } = await useDatabase()
    await database.delete(userLinks)
      .where(eq(userLinks.id, id))
    await this.loadShortcuts()
  },

  /**
   * Updates a module card's editable fields.
   *
   * @param moduleId The module identifier whose card is being edited.
   * @param data Partial editable properties (color, displayOrder)
   * @param data.color New color value
   * @param data.displayOrder New display order
   */
  async editModuleCard(moduleId: string, data: { color?: string, displayOrder?: number }) {
    const { database } = await useDatabase()
    const updates: any = {}
    if (data.color !== undefined)
      updates.color = data.color
    if (data.displayOrder !== undefined)
      updates.displayOrder = data.displayOrder
    if (Object.keys(updates).length === 0)
      return
    await database.update(userModules)
      .set(updates)
      .where(eq(userModules.moduleId, moduleId))
    await this.loadModuleCards()
  },

  /**
   * Updates a shortcut's editable fields.
   *
   * @param id The userLinks row id for the shortcut (same as Shortcut.id)
   * @param data Partial editable properties (icon, color, displayOrder, parameters)
   * @param data.icon New icon class
   * @param data.color New color value
   * @param data.displayOrder New display order
   * @param data.parameters Updated parameters payload
   */
  async editShortcut(id: number, data: { icon?: string, color?: string, displayOrder?: number, parameters?: Record<string, any> }) {
    const { database } = await useDatabase()
    const updates: any = {}
    if (data.icon !== undefined)
      updates.icon = data.icon
    if (data.color !== undefined)
      updates.color = data.color
    if (data.displayOrder !== undefined)
      updates.displayOrder = data.displayOrder
    if (data.parameters !== undefined)
      updates.parameters = data.parameters
    if (Object.keys(updates).length === 0)
      return
    await database.update(userLinks)
      .set(updates)
      .where(eq(userLinks.id, id))
    await this.loadShortcuts()
  },
})
