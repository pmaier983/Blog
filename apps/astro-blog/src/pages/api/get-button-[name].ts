import { z } from "zod"
import { supabase } from "~/lib/supabase"
import type { APIRoute } from "astro"

// https://docs.astro.build/en/guides/server-side-rendering/#opting-out-of-pre-rendering-in-hybrid-mode
export const prerender = false

const getButtonPropsSchema = z.object({
  name: z.string(),
})

type GetButtonProps = z.infer<typeof getButtonPropsSchema>

const getButton = async (props: GetButtonProps) => {
  try {
    // Find the button by name
    const { data: button, error: buttonError } = await supabase
      .from("blog_buttons")
      .select("*")
      .eq("name", props.name)
      .single()

    if (buttonError) {
      throw new Error(buttonError.message)
    }

    if (!button) {
      throw new Error(`Button not found with name: ${props.name}`)
    }

    console.log("Button details retrieved successfully")
    return new Response(JSON.stringify({ button }), { status: 200 })
  } catch (error) {
    console.error("Error retrieving button details:", error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}

export const GET: APIRoute = async ({ params }) => {
  const { success, error, data } = getButtonPropsSchema.safeParse(params)

  if (!success) {
    console.error("Invalid name parameter:", error)
    return new Response(JSON.stringify(error), { status: 400 })
  }

  return await getButton(data)
}
