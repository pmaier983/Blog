import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import { type AppRouter } from "@repo/backend-core"

const TRPC_URL = `http://localhost:${import.meta.env.BACKEND_API_PORT}`

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
