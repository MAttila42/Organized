import { auth } from '$lib/server/auth'
import { createHandler } from '@rttnd/gau/core'
import { Elysia } from 'elysia'
import modules from './modules'

const authHandler = createHandler(auth)
const app = new Elysia({ prefix: '/api', strictPath: false, aot: false })
  .mount(authHandler)
  .use(modules)
  .get('/', () => 'api')

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>
export const fallback: RequestHandler = ({ request }) => app.handle(request)
