import { eq } from "drizzle-orm"
import type { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db"
import { buttonClicks, buttons } from "~/db/schema"
import { getRequestParams } from "~/utils"
import { createId } from "@paralleldrive/cuid2"

const incrementButtonSchema = z.object({
  params: z.object({
    name: z.string(),
    userAgent: z.string().optional(),
    language: z.string().optional(),
    platform: z.string().optional(),
    screenResolution: z.string().optional(),
  }),
})

const V1 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await getRequestParams({
      schema: incrementButtonSchema,
      req,
      next,
    })

    await db.transaction(async (trx) => {
      const button = await trx.query.buttons.findFirst({
        where: eq(buttons.name, params.name),
      })

      if (!button) {
        throw new Error(`No button was found with the name: ${params.name}`)
      }

      await trx.insert(buttonClicks).values({
        id: createId(),
        buttonId: button.id,
        timestamp: new Date().toISOString(),
        // TODO: is there a way to avoid writing these nulls?
        userAgent: params.userAgent ?? null,
        language: params.language ?? null,
        platform: params.platform ?? null,
        screenResolution: params.screenResolution ?? null,
      })

      await trx
        .update(buttons)
        .set({
          clickCount: button.clickCount + 1,
        })
        .where(eq(buttons.name, params.name))
    })

    return res.send(200)
  } catch (error) {
    console.log(error)
    throw next(new Error(JSON.stringify(error)))
  }
}

export const incrementButton = { V1 }
