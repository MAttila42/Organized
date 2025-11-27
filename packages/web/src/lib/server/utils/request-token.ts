import { getCookieValue } from './cookies'

interface TokenSources {
  header?: string
  cookie?: string
}

export function getTokenFromRequest(request: Request, sources: TokenSources) {
  if (sources.header) {
    const headerValue = request.headers.get(sources.header)
    if (headerValue?.trim())
      return headerValue.trim()
  }

  if (sources.cookie) {
    const cookieValue = getCookieValue(request, sources.cookie)
    if (cookieValue?.trim())
      return cookieValue.trim()
  }

  return null
}
