import { initTRPC } from "@trpc/server"
import type * as trpcExpressType from "@trpc/server/adapters/express"
import { z } from "zod"
import { createId } from "@paralleldrive/cuid2"
import { eq, inArray } from "drizzle-orm"

import { buttonClicks, buttons, emailSignups } from "./db/schema.js"

import { db } from "./db/db.js"
import { BUTTON_NAME } from "./constants.js"

// created for each request
export const createContext =
  ({}: trpcExpressType.CreateExpressContextOptions) => ({}) // no context

type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

const buttonNameSchema = z.union([z.nativeEnum(BUTTON_NAME), z.string()])

const buttonClickSchema = z.object({
  name: buttonNameSchema,
  userAgent: z.string().optional(),
  language: z.string().optional(),
  screenResolution: z.string().optional(),
})

export const appRouter = t.router({
  getButtons: publicProcedure
    .input(
      z.object({
        names: z.array(buttonNameSchema),
      }),
    )
    .query(async ({ input: { names } }) => {
      const listOfButtons = await db
        .select()
        .from(buttons)
        .where(inArray(buttons.name, names))

      return listOfButtons
    }),
  getButton: publicProcedure
    .input(z.object({ name: buttonNameSchema }))
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

        // if the button does not exist create a new button
        if (!button) {
          const newButton = {
            id: createId(),
            name: input.name,
            clickCount: 0,
          }

          await trx.insert(buttons).values(newButton)
        }

        const buttonToIncrement =
          button ??
          (await trx.query.buttons.findFirst({
            where: eq(buttons.name, input.name),
          }))

        if (!buttonToIncrement) {
          throw new Error(
            `Something broke, No button was found with the name: ${input.name}`,
          )
        }

        await trx.insert(buttonClicks).values({
          id: createId(),
          buttonId: buttonToIncrement.id,
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
            clickCount: buttonToIncrement.clickCount + 1,
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
  addEmailSignup: publicProcedure
    .input(z.object({ email: z.string(), name: z.string().optional() }))
    .mutation(async ({ input }) => {
      // Only submit if the email is not already in the database
      const existingSignup = await db.query.emailSignups.findFirst({
        where: eq(emailSignups.email, input.email),
      })

      if (existingSignup) {
        return existingSignup
      }

      return await db.insert(emailSignups).values({
        id: createId(),
        email: input.email,
        name: input.name ?? null,
        timestamp: new Date().toISOString(),
      })
    }),
})

export type AppRouter = typeof appRouter
