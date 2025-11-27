import type { Context } from 'elysia'

export class ServiceError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ServiceError'
    this.status = status
  }
}

export function handleServiceError(set: Context['set'], error: unknown) {
  if (error instanceof ServiceError) {
    set.status = error.status
    return { message: error.message }
  }

  console.error('[server] unexpected error', error)
  set.status = 500
  return { message: 'Internal server error' }
}
