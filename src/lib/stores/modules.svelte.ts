import { useDatabase } from '$lib/database'
import { userModules } from '$lib/database/schema/home'
import { eq, gte, sql } from 'drizzle-orm'

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

  addLink(moduleId: string, link: Link) {
    const module = this.modules.find(m => m.id === moduleId)
    if (module)
      module.links.push(link)
    else
      throw new Error(`Module with id ${moduleId} not found`)
  },

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

  async disableModule(moduleId: string) {
    const { database } = await useDatabase()
    database.delete(userModules)
      .where(eq(userModules.moduleId, moduleId))
  },
})
