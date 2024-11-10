import "dotenv/config"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@repo/db-schema"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })
