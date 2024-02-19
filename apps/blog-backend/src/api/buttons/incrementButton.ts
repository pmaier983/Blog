import { eq } from "drizzle-orm"
import type { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db"
import { buttons } from "~/db/schema"
import { getRequestParams } from "~/utils"

const incrementButtonSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
})

const V1 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { name },
    } = await getRequestParams({ schema: incrementButtonSchema, req, next })

    await db.transaction(async (trx) => {
      const button = await trx.query.buttons.findFirst({
        where: eq(buttons.name, name),
      })

      if (!button) {
        throw new Error(`No button was found with the name: ${name}`)
      }

      await trx
        .update(buttons)
        .set({
          clickCount: button.clickCount + 1,
        })
        .where(eq(buttons.name, name))
    })

    return res.send(200)
  } catch (error) {
    console.log(error)
    throw next(new Error(JSON.stringify(error)))
  }
}

export const incrementButton = { V1 }
