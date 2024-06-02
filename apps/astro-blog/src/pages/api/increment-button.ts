// src/pages/api/increment-button.js
import { z } from "zod"
import { supabase } from "~/lib/supabase"
import { createId } from "@paralleldrive/cuid2"
import type { APIRoute } from "astro"

// https://docs.astro.build/en/guides/server-side-rendering/#opting-out-of-pre-rendering-in-hybrid-mode
export const prerender = false

const incrementButtonPropsSchema = z.object({
  name: z.string(),
  userAgent: z.string().optional(),
  language: z.string().optional(),
  screenResolution: z.string().optional(),
})

type IncrementButtonProps = z.infer<typeof incrementButtonPropsSchema>

const incrementButton = async (props: IncrementButtonProps) => {
  try {
    // Find the button by name
    const { data: button, error: buttonError } = await supabase
      .from("blog_buttons")
      .select("*")
      .eq("name", props.name)
      .single()

    if (buttonError) {
      throw new Error(buttonError?.message)
    }

    if (!button) {
      throw new Error(`Button not found with name: ${props.name}`)
    }

    // Insert a new button click
    const { error: insertError } = await supabase
      .from("blog_button_clicks")
      .insert({
        id: createId(),
        button_id: button.id,
        timestamp: new Date().toISOString(),
        user_agent: props.userAgent ?? null,
        language: props.language ?? null,
        screen_resolution: props.screenResolution ?? null,
      })

    if (insertError) {
      throw new Error(insertError.message)
    }

    // Update the button's click count
    const { error: updateError } = await supabase
      .from("blog_buttons")
      .update({ click_count: button.click_count + 1 })
      .eq("name", props.name)

    if (updateError) {
      throw new Error(
        `Failed to update button click count: ${updateError.message}`
      )
    }

    console.log("Button click incremented successfully")
    return new Response(
      JSON.stringify({ message: "Button click incremented successfully" })
    )
  } catch (error) {
    console.error("Error incrementing button click:", error)
    return new Response(JSON.stringify({ error: error }), { status: 500 })
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Ensure the request is JSON
  if (request.headers.get("Content-Type") !== "application/json")
    return new Response(null, { status: 400 })

  const props = await request.json()

  const { success, error, data } = incrementButtonPropsSchema.safeParse(props)

  if (!success) {
    console.error("Invalid props:", error)
    return new Response(JSON.stringify(error), { status: 400 })
  }

  return await incrementButton(data)
}
