import React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { trpcReactQuery } from "~/client"
import { queryClientAtom, trpcQueryClientAtom } from "~/consts"

// Inspired by: https://www.thomasledoux.be/blog/using-trpc-astro-islands-react
export const withQueryProvider = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> => {
  return (props: P) => {
    const [queryClient] = useAtom(queryClientAtom)
    const [trpcClient] = useAtom(trpcQueryClientAtom)

    return (
      <trpcReactQuery.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </trpcReactQuery.Provider>
    )
  }
}
