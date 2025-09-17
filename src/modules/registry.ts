interface ModuleEntry {
  name: string
  load?: () => void | Promise<void>
}

const moduleFiles = import.meta.glob('./*/index.ts', { eager: true })

const modules: ModuleEntry[] = Object.entries(moduleFiles).map(([path, mod]) => {
  const nameMatch = /\.\/([^/]+)\/index\.ts$/.exec(path)
  const name = nameMatch ? nameMatch[1] : path
  const loadFn = (mod as any).load as ModuleEntry['load']
  return { name, load: loadFn }
})

const moduleLoads = modules
  .map(m => m.load)
  .filter((fn): fn is NonNullable<ModuleEntry['load']> => Boolean(fn))

export { moduleLoads, modules }

export async function loadAllModules(): Promise<void> {
  for (const m of modules) {
    if (m.load)
      await m.load()
  }
}

export async function loadModule(name: string): Promise<void> {
  const m = modules.find(m => m.name === name)
  if (m?.load)
    await m.load()
}
