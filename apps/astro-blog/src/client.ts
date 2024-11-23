import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import type { AppRouter } from "@repo/backend-core"

if (!import.meta.env.PUBLIC_BACKEND_API_URL) {
  throw new Error(
    "Missing PUBLIC_BACKEND_API_URL. Are you calling this from the turbo root with the turbo dev command?",
  )
}

const TRPC_URL = `http://${import.meta.env.PUBLIC_BACKEND_API_URL}/trpc`

export const getTrpcAstro = () =>
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: TRPC_URL,
      }),
    ],
  })

/**
 * Only use this in react components! use the above alterative in .astro components
 */
export const trpcReact = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: TRPC_URL,
    }),
  ],
})
