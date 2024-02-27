import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// eslint-disable-next-line import/no-default-export
export default {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  out: "./src/db/migrations-folder",
  dbCredentials: {
    uri: process.env.DATABASE_URL ?? "",
  },
  tablesFilter: ["personal_site_*"],
} satisfies Config