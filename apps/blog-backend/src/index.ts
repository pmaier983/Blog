import { createHTTPServer } from "@trpc/server/adapters/standalone"

import { appRouter } from "@repo/backend-core"

createHTTPServer({
  router: appRouter,
}).listen(process.env.BACKEND_API_PORT)
