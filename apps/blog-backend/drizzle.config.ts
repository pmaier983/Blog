import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// eslint-disable-next-line import/no-default-export
export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./src/db/migrations-folder",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  tablesFilter: ["blog_*"],
} satisfies Config
