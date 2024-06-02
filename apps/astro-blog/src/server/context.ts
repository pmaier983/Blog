import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { supabase } from "~/db"

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    ...opts,
    supabase,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
