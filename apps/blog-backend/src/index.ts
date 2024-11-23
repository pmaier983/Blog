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

// TODO: configure cors for prod
app.use(
  cors({
    origin: "http://localhost:4321", // Replace with the allowed origin(s)
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
