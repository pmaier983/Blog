import { relations } from "drizzle-orm"
import { pgTableCreator, text, integer } from "drizzle-orm/pg-core"

const pgTable = pgTableCreator((name) => `blog_${name}`)

export const buttons = pgTable("buttons", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  clickCount: integer("click_count").notNull().default(0),
})
export const buttonsRelations = relations(buttons, ({ many }) => ({
  buttons: many(buttonClicks),
}))

export const buttonClicks = pgTable("button_clicks", {
  id: text("id").primaryKey().notNull(),
  buttonId: text("button_id").notNull(),
  timestamp: text("timestamp").notNull(),
  userAgent: text("user_agent"),
  language: text("language"),
  screenResolution: text("screen_resolution"),
})
