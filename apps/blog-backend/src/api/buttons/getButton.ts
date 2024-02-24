import { eq } from "drizzle-orm"
import type { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db"
import { buttons } from "~/db/schema"
import { getRequestParams } from "~/utils"

const getButtonSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
})

const V1 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { name },
    } = await getRequestParams({ schema: getButtonSchema, req, next })

    const button = await db.query.buttons.findFirst({
      where: eq(buttons.name, name),
    })

    return res.json({ button })
  } catch (error) {
    req.log.error("getButton.V1")
    throw next(new Error(JSON.stringify(error)))
  }
}

export const getButton = { V1 }
