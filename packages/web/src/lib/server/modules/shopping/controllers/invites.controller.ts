import { requireInstanceToken } from '$lib/server/utils/auth'
import { handleServiceError } from '$lib/server/utils/errors'
import Elysia, { t } from 'elysia'
import {
  acceptInvite,
  createInvite,
  deleteInvite,
  getInviteInfo,
  getInvitesByListId,
} from '../services/shopping-invite.service'
import { listIdParams } from './schemas'

const invitePayloadSchema = t.Object({
  maxUses: t.Optional(t.Nullable(t.Number({ minimum: 1 }))),
  expiresAt: t.Optional(t.Nullable(t.String())),
})

const inviteIdParams = t.Object({
  inviteId: t.String({ minLength: 1 }),
})

const inviteCodeParams = t.Object({
  code: t.String({ minLength: 1 }),
})

const invitesController = new Elysia({
  prefix: '/invites',
  strictPath: false,
  aot: false,
})
  // Get invite info (public, no auth required)
  .get('/:code', async ({ params, set }) => {
    try {
      const info = await getInviteInfo(params.code)
      return { invite: info }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: inviteCodeParams,
  })
  // Accept an invite (requires instance token)
  .post('/:code/accept', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const member = await acceptInvite(params.code, instanceId)
      return { member }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: inviteCodeParams,
  })
  // Delete an invite by ID (owner only)
  .delete('/:inviteId', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      await deleteInvite(params.inviteId, instanceId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: inviteIdParams,
  })

// List-scoped invite routes (nested under /lists/:listId/invites)
export const listInvitesController = new Elysia({
  prefix: '/:listId/invites',
  strictPath: false,
  aot: false,
})
  // Get all invites for a list (owner only)
  .get('/', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const invites = await getInvitesByListId(params.listId, instanceId)
      return { invites }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })
  // Create an invite for a list (owner only)
  .post('/', async ({ params, body, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const invite = await createInvite(params.listId, instanceId, body)
      return { invite }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
    body: invitePayloadSchema,
  })

export default invitesController
