import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { createId } from "@paralleldrive/cuid2"

import { createContext, type Context } from "./context"
import { eq } from "drizzle-orm"
import { buttonClicks, buttons } from "@repo/db-schema"

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = t.router({
  getButton: publicProcedure.query(async ({ ctx }) => {
    const button = await ctx.db.query.buttons.findFirst({
      // TODO: use the real input!
      where: eq(buttons.name, "test"),
    })

    return button
  }),
  incrementButton: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userAgent: z.string().optional(),
        language: z.string().optional(),
        screenResolution: z.string().optional(),
      }),
    )
    .mutation(
      async ({ input, ctx }) =>
        await ctx.db.transaction(async (trx) => {
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
          })

          await trx
            .update(buttons)
            .set({
              clickCount: button.clickCount + 1,
            })
            .where(eq(buttons.name, input.name))
        }),
    ),
})

// export type definition of API
export type AppRouter = typeof appRouter

createHTTPServer({
  router: appRouter,
  createContext: createContext,
  // Move 8080 to ENV
}).listen(8080)
