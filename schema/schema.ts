import { int, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core"

// This is essentially a db prefix, allowing us to have multiple projects on the same db easily
// This is 100% not a recommended pattern for a real product...
const mysqlTable = mysqlTableCreator((name) => `personal_site_${name}`)

export const buttons = mysqlTable("buttons", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  clickCount: int("click_count").notNull().default(0),
})
