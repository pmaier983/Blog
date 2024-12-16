import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// eslint-disable-next-line import/no-default-export
export default {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./migrations-folder",
  dbCredentials: {
    // https://github.com/drizzle-team/drizzle-orm/issues/2590
    url: process.env.DATABASE_URL?.replace("6543", "5432")!,
  },
  tablesFilter: ["blog_*"],
} satisfies Config
