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
  enabledModules: [] as string[],

  addLink(moduleId: string, link: Link) {
    const module = this.modules.find(m => m.id === moduleId)
    if (module)
      module.links.push(link)
    else
      throw new Error(`Module with id ${moduleId} not found`)
  },

  disableModule(moduleId: string) {
    this.enabledModules = this.enabledModules.filter(id => id !== moduleId)
  },
})
