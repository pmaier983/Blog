/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string

  readonly DATABASE_URL: string
  readonly PUBLIC_BACKEND_API_URL: string

  readonly DOCKER_REGISTRY: string
  readonly AWS_ACCOUNT_ID: string
}
