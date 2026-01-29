import { getTokenFromRequest } from '$lib/server/utils/request-token'
import Elysia from 'elysia'
import { ShoppingServiceError } from '../services/errors'

const ACCESS_TOKEN_HEADER = 'x-shopping-access-token'
const ACCESS_TOKEN_COOKIE = 'shopping_access_token'

export function resolveShoppingAccessToken(request: Request) {
  return getTokenFromRequest(request, {
    header: ACCESS_TOKEN_HEADER,
    cookie: ACCESS_TOKEN_COOKIE,
  })
}

export function requireShoppingAccessToken(request: Request) {
  const token = resolveShoppingAccessToken(request)
  if (!token)
    throw new ShoppingServiceError(400, 'Shopping access token is required')

  return token
}

export function withShoppingAccessToken<T extends Elysia<any, any, any, any, any, any, any>>(app?: T) {
  const target = app ?? new Elysia({ name: 'shopping.access-token' })
  return target.derive(({ request }) => ({
    accessToken: requireShoppingAccessToken(request),
  }))
}
