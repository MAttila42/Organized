import { auth } from '$lib/server/auth'
import { SESSION_COOKIE_NAME } from '@rttnd/gau/core'
import { getCookieValue } from './cookies'
import { ServiceError } from './errors'

export function extractSessionToken(request: Request) {
  const authorization = request.headers.get('authorization')
  if (authorization?.startsWith('Bearer '))
    return authorization.slice(7)

  return getCookieValue(request, SESSION_COOKIE_NAME)
}

export async function requireUserId(request: Request) {
  const token = extractSessionToken(request)
  if (!token)
    throw new ServiceError(401, 'Unauthorized')

  const session = await auth.validateSession(token)
  if (!session?.user)
    throw new ServiceError(401, 'Unauthorized')

  return session.user.id
}

/**
 * Extract and require instance token from request.
 * Instance tokens identify an app installation (anonymous user).
 */
export function requireInstanceToken(request: Request): string {
  const instanceToken = request.headers.get('x-instance-token')
  if (!instanceToken)
    throw new ServiceError(401, 'Missing instance token')

  // Basic validation: should be a UUID-like string
  if (instanceToken.length < 32)
    throw new ServiceError(401, 'Invalid instance token')

  return instanceToken
}
