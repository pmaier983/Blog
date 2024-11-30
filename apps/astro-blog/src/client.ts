import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import type { AppRouter } from "@repo/backend-core"

if (!import.meta.env.PUBLIC_BACKEND_API_URL) {
  throw new Error("Missing PUBLIC_BACKEND_API_URL")
}

/* 
  On the server we need to point to the docker container endpoint
  but on the client we need to point to the "publicly" available API
*/
const TRPC_URL = (() => {
  const isClient = typeof window !== "undefined"

  const isUsingDockerComposeUp = !!import.meta.env
    .PUBLIC_IN_NETWORK_BACKEND_API_URL

  if (!isUsingDockerComposeUp) {
    return import.meta.env.PUBLIC_BACKEND_API_URL
  }

  if (isClient) {
    return import.meta.env.PUBLIC_BACKEND_API_URL
  } else {
    return import.meta.env.PUBLIC_IN_NETWORK_BACKEND_API_URL
  }
})()

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
