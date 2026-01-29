declare module 'https://*'

interface ImportMetaEnv {
  readonly API_URL?: string
  readonly API_AUTH_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
