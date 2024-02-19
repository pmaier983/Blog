import { int, varchar, mysqlTableCreator } from "drizzle-orm/mysql-core"

const mysqlTable = mysqlTableCreator((name) => `personal_site_${name}`)

export const buttons = mysqlTable("buttons", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  clickCount: int("click_count").notNull().default(0),
})
