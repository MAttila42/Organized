import { requireUserId } from '$lib/server/utils/auth'
import { handleServiceError } from '$lib/server/utils/errors'
import { hasUpdatableField } from '$lib/server/utils/validation'
import Elysia from 'elysia'
import { ShoppingServiceError } from '../services/errors'
import {
  createList,
  deleteList,
  getListWithItems,
  rotateAccessToken,
  updateList,
} from '../services/shopping-list.service'
import { withShoppingAccessToken } from '../utils/access-token'
import {
  listIdParams,
  listPayloadSchema,
  listUpdateSchema,
} from './schemas'

const listAccessRoutes = withShoppingAccessToken(new Elysia({
  prefix: '/access',
  strictPath: false,
  aot: false,
}))
  .get('/', async ({ accessToken, set }) => {
    try {
      return getListWithItems(accessToken)
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  })

const listsController = new Elysia({
  prefix: '/lists',
  strictPath: false,
  aot: false,
})
  .use(listAccessRoutes)
  .post('/', async ({ body, request, set }) => {
    try {
      const ownerId = await requireUserId(request)
      const list = await createList(ownerId, body)
      return { list }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    body: listPayloadSchema,
  })
  .patch('/:listId', async ({ params, body, request, set }) => {
    try {
      if (!hasUpdatableField(body))
        throw new ShoppingServiceError(400, 'Provide at least one field to update')

      const ownerId = await requireUserId(request)
      const list = await updateList(params.listId, ownerId, body)
      return { list }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
    body: listUpdateSchema,
  })
  .post('/:listId/rotate-access-token', async ({ params, request, set }) => {
    try {
      const ownerId = await requireUserId(request)
      const list = await rotateAccessToken(params.listId, ownerId)
      return { list }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })
  .delete('/:listId', async ({ params, request, set }) => {
    try {
      const ownerId = await requireUserId(request)
      await deleteList(params.listId, ownerId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })

export default listsController
