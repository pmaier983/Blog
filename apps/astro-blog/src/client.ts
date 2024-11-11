import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import { type AppRouter } from "@repo/backend-core"

// TODO: move 8080 to env
const TRPC_URL = `http://localhost:${8080}/trpc`

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
