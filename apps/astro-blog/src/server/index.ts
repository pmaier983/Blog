import { initTRPC } from "@trpc/server"
import { z } from "zod"
import type { Context } from "./context"
import { createId } from "@paralleldrive/cuid2"

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = t.router({
  getButton: publicProcedure.query(async ({ ctx }) => {
    // Find the button by name
    const { data: button, error: buttonError } = await ctx.supabase
      .from("blog_buttons")
      .select("*")
      .eq("name", "test")
      .single()

    console.log(button)

    if (buttonError) {
      throw new Error(buttonError.message)
    }

    if (!button) {
      throw new Error(`Button not found with name: ${"test"}`)
    }

    console.log("Button details retrieved successfully")
    return button
  }),
  incrementButton: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userAgent: z.string().optional(),
        language: z.string().optional(),
        screenResolution: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Find the button by name
      const { data: button, error: buttonError } = await ctx.supabase
        .from("blog_buttons")
        .select("*")
        .eq("name", input.name)
        .single()

      if (buttonError) {
        throw new Error(buttonError?.message)
      }

      if (!button) {
        throw new Error(`Button not found with name: ${input.name}`)
      }

      // Insert a new button click
      const { error: insertError } = await ctx.supabase
        .from("blog_button_clicks")
        .insert({
          id: createId(),
          button_id: button.id,
          timestamp: new Date().toISOString(),
          user_agent: input.userAgent ?? null,
          language: input.language ?? null,
          screen_resolution: input.screenResolution ?? null,
        })

      if (insertError) {
        throw new Error(insertError.message)
      }

      // Update the button's click count
      const { error: updateError } = await ctx.supabase
        .from("blog_buttons")
        .update({ click_count: button.click_count + 1 })
        .eq("name", input.name)

      if (updateError) {
        throw new Error(
          `Failed to update button click count: ${updateError.message}`
        )
      }

      console.log("Button click incremented successfully")
      return { message: "Button click incremented successfully" }
    }),
})

export type AppRouter = typeof appRouter
