import { createHTTPServer } from "@trpc/server/adapters/standalone"

import { appRouter, type AppRouter, createContext } from "@repo/backend-core"

createHTTPServer<AppRouter>({
  router: appRouter,
  createContext,
}).listen(Number(process.env.BACKEND_API_PORT))
