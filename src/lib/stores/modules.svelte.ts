import { useDatabase } from '$lib/database'
import { userLinks, userModules } from '$lib/database/schema/home'
import { and, eq, gte, sql } from 'drizzle-orm'

export interface Module {
  id: string
  name: string
  description: string
  links: Link[]
}

export interface Link {
  id: string
  type: 'shortcut' | 'label'
  name: string
  moduleId: string
  description: string
  parameters: LinkParameter[]
  call: (params: Record<string, any>) => void
}

export interface LinkParameter {
  id: string
  name: string
  type: 'string' | 'number' | 'boolean'
  defaultValue?: string | number | boolean
}

export const moduleStore = $state({
  modules: [] as Module[],

  /**
   * Registers a new link.
   *
   * Use only in module initialization.
   *
   * @param moduleId The module identifier this link is for.
   * @param link The link to register.
   */
  registerLink(moduleId: string, link: Link) {
    const module = this.modules.find(m => m.id === moduleId)
    if (module)
      module.links.push(link)
    else
      throw new Error(`Module with id ${moduleId} not found`)
  },

  /**
   * Retrieves all enabled modules with their labels.
   *
   * @returns All enabled modules with their labels.
   */
  async getAllEnabled() {
    const { database } = await useDatabase()
    const enabledModules = await database.select()
      .from(userModules)
      .orderBy(userModules.displayOrder)
    const enabledLabels = await database.select()
      .from(userLinks)
      .where(eq(userLinks.type, 'label'))
      .orderBy(userLinks.displayOrder)

    return enabledModules.map(m => ({
      moduleId: m.moduleId,
      color: m.color,
      labels: enabledLabels.filter(l => l.moduleId === m.moduleId)
        .map(l => ({
          linkId: l.linkId,
          icon: l.icon,
          color: l.color,
          parameters: l.parameters,
        })),
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
  async enableModule(moduleId: string, color: string, position: number) {
    const { database } = await useDatabase()
    const result = await database.select()
      .from(userModules)
      .where(eq(userModules.displayOrder, position))

    if (result.length > 0) {
      database.update(userModules)
        .set({ displayOrder: sql`${userModules.displayOrder} + 1` })
        .where(gte(userModules.displayOrder, position))
    }

    database.insert(userModules).values({
      moduleId,
      color,
      displayOrder: position,
    })
  },

  /**
   * Disables a module.
   *
   * @param moduleId The module identifier to disable.
   */
  async disableModule(moduleId: string) {
    const { database } = await useDatabase()
    database.delete(userModules)
      .where(eq(userModules.moduleId, moduleId))
  },

  /**
   * Retrieves all labels for a module.
   *
   * @param moduleId The module identifier to get labels for.
   * @returns An array of labels for the specified module.
   */
  async getLabels(moduleId: string) {
    return this.modules
      .find(m => m.id === moduleId)
      ?.links
      .filter(l => l.type === 'label')
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
      database.update(userLinks)
        .set({ displayOrder: sql`${userLinks.displayOrder} + 1` })
        .where(and(
          eq(userLinks.moduleId, moduleId),
          gte(userLinks.displayOrder, position),
        ))
    }

    database.insert(userLinks).values({
      linkId,
      type: 'label',
      displayOrder: position,
      parameters,
      moduleId,
    })
  },

  /**
   * Removes a label from a module.
   *
   * @param moduleId The module identifier to remove the label from.
   * @param id The label identifier to remove.
   */
  async removeLabel(moduleId: string, id: number) {
    const { database } = await useDatabase()
    database.delete(userLinks)
      .where(and(
        eq(userLinks.moduleId, moduleId),
        eq(userLinks.id, id),
      ))
  },
})
