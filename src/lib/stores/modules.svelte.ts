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

export const modules = $state<Module[]>([])

export function addLink(moduleId: string, link: Link): void {
  const module = modules.find(m => m.id === moduleId)
  if (module)
    module.links.push(link)
  else
    throw new Error(`Module with id ${moduleId} not found`)
}
