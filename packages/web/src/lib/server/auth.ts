import { env } from '$env/dynamic/private'
import { DrizzleAdapter } from '@rttnd/gau/adapters/drizzle'
import { createAuth } from '@rttnd/gau/core'
import { GitHub, Google } from '@rttnd/gau/oauth'
import { db } from './db'
import { Accounts, Users } from './db/schema'

export const auth = createAuth({
  adapter: DrizzleAdapter(db, Users, Accounts),
  providers: [
    GitHub({
      clientId: env.GITHUB_CLIENT_ID!,
      clientSecret: env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    secret: env.AUTH_SECRET!,
  },
})

export type Auth = typeof auth
