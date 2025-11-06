import { createModuleRouteShortcut } from '../utils'

export function createAddTransactionShortcut() {
  const navigate = createModuleRouteShortcut('finances', 'record-transaction')

  return async (params?: Record<string, string>) => {
    const payload: Record<string, string> = {}
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        const normalized = (typeof value === 'string' ? value : String(value)).trim()
        if (normalized)
          payload[key] = normalized
      }
    }

    await navigate(payload)
  }
}
