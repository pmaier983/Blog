import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "~/server"

/**
  The alternative to passing in Astro.url to this function
  Would be an up to date env with the correct URL
  But I don't want to do that, so here we are
  How to use:

  const trpcAstro = getTrpcAstro(Astro.url)

  Details: https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
 */
export const getTrpcAstro = (astroUrl: URL) =>
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: new URL(`/api/trpc`, astroUrl),
      }),
    ],
  })

// Only use this in react components! use the above alterative in .astro components
export const trpcReact = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
})
