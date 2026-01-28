import { requireInstanceToken } from '$lib/server/utils/auth'
import { handleServiceError } from '$lib/server/utils/errors'
import { hasUpdatableField } from '$lib/server/utils/validation'
import Elysia from 'elysia'
import { ShoppingServiceError } from '../services/errors'
import {
  createList,
  deleteList,
  getListsByOwner,
  getListWithItems,
  rotateAccessToken,
  updateList,
} from '../services/shopping-list.service'
import { withShoppingAccessToken } from '../utils/access-token'
import { listInvitesController } from './invites.controller'
import { listMembersController } from './members.controller'
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
  .get('/', async ({ request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const lists = await getListsByOwner(instanceId)
      return { lists }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  })
  .post('/', async ({ body, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const list = await createList(instanceId, body)
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

      const instanceId = requireInstanceToken(request)
      const list = await updateList(params.listId, instanceId, body)
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
      const instanceId = requireInstanceToken(request)
      const list = await rotateAccessToken(params.listId, instanceId)
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
      const instanceId = requireInstanceToken(request)
      await deleteList(params.listId, instanceId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })
  .use(listInvitesController)
  .use(listMembersController)

export default listsController
