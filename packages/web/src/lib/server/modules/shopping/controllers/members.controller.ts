import { requireInstanceToken } from '$lib/server/utils/auth'
import { handleServiceError } from '$lib/server/utils/errors'
import Elysia, { t } from 'elysia'
import {
  getMembersByListId,
  leaveList,
  removeMember,
} from '../services/shopping-member.service'
import { listIdParams } from './schemas'

const memberIdParams = t.Object({
  memberId: t.String({ minLength: 1 }),
})

const membersController = new Elysia({
  prefix: '/members',
  strictPath: false,
  aot: false,
})
  // Remove a member (owner or self)
  .delete('/:memberId', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      await removeMember(params.memberId, instanceId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: memberIdParams,
  })

// List-scoped member routes (nested under /lists/:listId/members)
export const listMembersController = new Elysia({
  prefix: '/:listId/members',
  strictPath: false,
  aot: false,
})
  // Get all members of a list
  .get('/', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      const members = await getMembersByListId(params.listId, instanceId)
      return { members }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })
  // Leave a list (self-remove)
  .delete('/leave', async ({ params, request, set }) => {
    try {
      const instanceId = requireInstanceToken(request)
      await leaveList(params.listId, instanceId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: listIdParams,
  })

export default membersController
