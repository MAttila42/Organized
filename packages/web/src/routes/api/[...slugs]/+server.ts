import { Elysia } from 'elysia'

const app = new Elysia({ prefix: '/api' })
  .get('/', () => 'api')

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

export const fallback: RequestHandler = ({ request }) => app.handle(request)
