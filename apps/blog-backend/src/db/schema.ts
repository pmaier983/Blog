import { relations } from "drizzle-orm"
import { int, varchar, mysqlTableCreator } from "drizzle-orm/mysql-core"

const mysqlTable = mysqlTableCreator((name) => `personal_site_${name}`)

export const buttons = mysqlTable("buttons", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  clickCount: int("click_count").notNull().default(0),
})
export const buttonsRelations = relations(buttons, ({ many }) => ({
  buttons: many(buttonClicks),
}))

export const buttonClicks = mysqlTable("button_clicks", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  buttonId: varchar("button_id", { length: 191 }).notNull(),
  timestamp: varchar("timestamp", { length: 191 }).notNull(),
  userAgent: varchar("user_agent", { length: 512 }),
  language: varchar("language", { length: 191 }),
  screenResolution: varchar("screen_resolution", { length: 191 }),
})
