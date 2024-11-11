import { createHTTPServer } from "@trpc/server/adapters/standalone"

import { appRouter } from "@repo/backend-core"

createHTTPServer({
  router: appRouter,
  // Move 8080 to ENV
}).listen(8080)
