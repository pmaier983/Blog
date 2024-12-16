import { relations } from "drizzle-orm"
import { pgTableCreator, text, integer } from "drizzle-orm/pg-core"

export const BUTTON_CLICK_TYPES = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
} as const

export type ButtonClickType = keyof typeof BUTTON_CLICK_TYPES

// TODO: migrate this database schema to a package in turbo
// TODO: make these into zod schemas as well!

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
  // add a direction field with an enum of INCRMENET or DECREMENT,
  type: text({
    // TODO: avoid this somehow?
    enum: [BUTTON_CLICK_TYPES.INCREMENT, BUTTON_CLICK_TYPES.DECREMENT],
  }),
})
