import type { inferAsyncReturnType } from "@trpc/server"
import { db } from "~/db"

export const createContext = async () => {
  return {
    db,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
