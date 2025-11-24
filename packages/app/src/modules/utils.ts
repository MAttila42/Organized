import { browser } from '$app/environment'
import { goto } from '$app/navigation'
import { page } from '$app/state'
import { moduleStore } from '$lib/stores/modules.svelte'

type Module = (typeof moduleStore.modules)[number]
type Link = Module['links'][number]

interface ModuleRegistration extends Omit<Module, 'links'> {
  links?: Link[]
}

/**
 * Registers or updates a module definition inside the module store.
 * Ensures idempotent registration when load functions run multiple times.
 */
export function registerModule({ links = [], ...module }: ModuleRegistration): Module {
  const definition: Module = {
    ...module,
    links,
  }

  const index = moduleStore.modules.findIndex(m => m.id === definition.id)

  if (index === -1)
    moduleStore.modules.push(definition)
  else
    moduleStore.modules[index] = definition

  return definition
}

/**
 * Creates a shortcut call handler that navigates to a module route with optional extra segments.
 */
/**
 * Generates a shortcut handler that navigates to a module route.
 *
 * @param moduleId The module identifier to navigate to.
 * @param segments Optional additional path segments appended to the module route.
 * @returns An async function that performs the navigation when invoked.
 */
export function createModuleRouteShortcut(moduleId: string, ...segments: string[]) {
  const path = segments
    .map(segment => segment.trim())
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/')

  return async (params?: Record<string, string | number | boolean>) => {
    const { goto } = await import('$app/navigation')
    const url = path ? `/module/${moduleId}/${path}` : `/module/${moduleId}`

    let query = ''
    if (params && Object.keys(params).length > 0) {
      const search = new URLSearchParams()
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null)
          continue
        search.set(key, String(value))
      }
      const serialized = search.toString()
      if (serialized)
        query = `?${serialized}`
    }

    await goto(`${url}${query}`)
  }
}

/**
 * Creates helpers for working with shortcut-driven module routes.
 *
 * @param moduleId The module identifier owning the route.
 * @param routeKey The first path segment that triggers the shortcut state.
 * @returns Functions to detect route activity, ensure dialogs open, and reset the route.
 */
export function createShortcutRoute(moduleId: string, routeKey: string) {
  const moduleRoute = `/module/${moduleId}`
  let hasOpenedForRoute = false
  let pendingReset = false

  const isActive = () => {
    if (!browser)
      return false
    const rest = page.params?.rest ?? ''
    return rest.split('/')[0] === routeKey
  }

  const ensureOpen = (open: boolean, setOpen: (value: boolean) => void) => {
    if (!browser)
      return

    if (isActive()) {
      if (open) {
        hasOpenedForRoute = true
        pendingReset = false
        return
      }

      if (!hasOpenedForRoute) {
        hasOpenedForRoute = true
        pendingReset = false
        setOpen(true)
      }
      return
    }

    hasOpenedForRoute = false
    pendingReset = false
  }

  const reset = () => {
    if (!browser || pendingReset)
      return
    pendingReset = true
    void goto(moduleRoute, { replaceState: true })
  }

  return { isActive, ensureOpen, reset }
}

/**
 * Builds a reusable sync function to pair a dialog's open state with a shortcut route.
 *
 * @param route The shortcut route helpers created by {@link createShortcutRoute}.
 * @param getOpen Getter returning the current dialog open state.
 * @param setOpen Setter updating the dialog open state.
 * @returns A function intended to run inside `$effect` that keeps state and route aligned.
 */
export function createShortcutDialogSync(
  route: ReturnType<typeof createShortcutRoute>,
  getOpen: () => boolean,
  setOpen: (value: boolean) => void,
) {
  return () => {
    route.ensureOpen(getOpen(), setOpen)
    if (!getOpen() && route.isActive())
      route.reset()
  }
}
