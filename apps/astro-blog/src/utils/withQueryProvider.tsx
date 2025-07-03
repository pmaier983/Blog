import React, { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { TRPC_URL, trpcReactQuery } from "~/utils/client"
import { httpBatchLink } from "@trpc/client"
import { useAtomValue } from "jotai"
import { queryClientAtom } from "~/utils/consts"

// Inspired by: https://www.thomasledoux.be/blog/using-trpc-astro-islands-react
export const withQueryProvider = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> => {
  return (props: P) => {
    const queryClient = useAtomValue(queryClientAtom)
    const [trpcClient] = useState(() =>
      trpcReactQuery.createClient({
        links: [
          httpBatchLink({
            url: TRPC_URL,
          }),
        ],
      }),
    )

    return (
      <trpcReactQuery.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </trpcReactQuery.Provider>
    )
  }
}
