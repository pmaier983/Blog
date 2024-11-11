import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// eslint-disable-next-line import/no-default-export
export default {
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./migrations-folder",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["blog_*"],
} satisfies Config
