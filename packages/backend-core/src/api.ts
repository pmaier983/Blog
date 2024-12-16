import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { createId } from "@paralleldrive/cuid2"
import { eq } from "drizzle-orm"

import { buttonClicks, buttons } from "./db/schema.js"

import { db } from "./db/db.js"
import { BUTTON_NAME } from "./constants.js"

export const createContext = () => ({})

export const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

const buttonClickSchema = z.object({
  name: z.string(),
  userAgent: z.string().optional(),
  language: z.string().optional(),
  screenResolution: z.string().optional(),
})

export const appRouter = t.router({
  getButton: publicProcedure
    .input(z.object({ name: z.nativeEnum(BUTTON_NAME) }))
    .query(async ({ input: { name } }) => {
      const button = await db.query.buttons.findFirst({
        where: eq(buttons.name, name),
      })

      // if the button doesn't exist, create it
      if (!button) {
        const newButton = {
          id: createId(),
          name,
          clickCount: 0,
        }

        await db.insert(buttons).values(newButton)

        return newButton
      }

      return button
    }),
  incrementButton: publicProcedure.input(buttonClickSchema).mutation(
    async ({ input }) =>
      await db.transaction(async (trx) => {
        const button = await trx.query.buttons.findFirst({
          where: eq(buttons.name, input.name),
        })

        if (!button) {
          throw new Error(`No button was found with the name: ${input.name}`)
        }

        await trx.insert(buttonClicks).values({
          id: createId(),
          buttonId: button.id,
          timestamp: new Date().toISOString(),
          // TODO: is there a way to avoid writing these nulls?
          userAgent: input.userAgent ?? null,
          language: input.language ?? null,
          screenResolution: input.screenResolution ?? null,
          type: "INCREMENT",
        })

        await trx
          .update(buttons)
          .set({
            clickCount: button.clickCount + 1,
          })
          .where(eq(buttons.name, input.name))
      }),
  ),
  decrementButton: publicProcedure.input(buttonClickSchema).mutation(
    async ({ input }) =>
      await db.transaction(async (trx) => {
        const button = await trx.query.buttons.findFirst({
          where: eq(buttons.name, input.name),
        })

        if (!button) {
          throw new Error(`No button was found with the name: ${input.name}`)
        }

        await trx.insert(buttonClicks).values({
          id: createId(),
          buttonId: button.id,
          timestamp: new Date().toISOString(),
          // TODO: is there a way to avoid writing these nulls?
          userAgent: input.userAgent ?? null,
          language: input.language ?? null,
          screenResolution: input.screenResolution ?? null,
          type: "DECREMENT",
        })

        await trx
          .update(buttons)
          .set({
            clickCount: button.clickCount - 1,
          })
          .where(eq(buttons.name, input.name))
      }),
  ),
})

export type AppRouter = typeof appRouter
