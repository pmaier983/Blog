import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { APIRoute } from "astro"
import { appRouter } from "~/server"
import { createContext } from "~/server/context"

// https://docs.astro.build/en/guides/server-side-rendering/#opting-out-of-pre-rendering-in-hybrid-mode
export const prerender = false

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  })
}
