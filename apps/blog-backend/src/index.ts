import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import cors from "cors"

import { appRouter, type AppRouter, createContext } from "@repo/backend-core"

const app = express()

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Are you calling this from the turbo root? With the turbo dev command?",
  )
}

if (!process.env.PUBLIC_FRONTEND_URL) {
  throw new Error("PUBLIC_FRONTEND_URL is not set.")
}

// TODO: configure CORS for prod
app.use(
  cors({
    // The astro-blog is to enable docker compose up to work!
    origin: [
      process.env.PUBLIC_FRONTEND_URL,
      "http://localhost:4321",
      "http://astro-blog:4321",
      "https://phillipmaier.com",
    ], // Replace with the allowed origin(s)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true, // Allow credentials (e.g., cookies, auth headers)
  }),
)

// Set up the tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware<AppRouter>({
    router: appRouter,
    createContext,
  }),
)

// TODO: consider centralizing this port in the .env file
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
