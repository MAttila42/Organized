import { Elysia } from 'elysia'

const modulePlugins = import.meta.glob<{ default: Elysia }>(
  '$lib/server/modules/*/index.ts',
  { eager: true },
)

const modules = new Elysia({
  prefix: '/modules',
  strictPath: false,
  aot: false,
}).get('/', () => 'modules root')

const plugins = Object.values(modulePlugins)
  .map(mod => mod.default)
  .filter((instance): instance is Elysia => Boolean(instance))

for (const plugin of plugins)
  modules.use(plugin)

export default modules
