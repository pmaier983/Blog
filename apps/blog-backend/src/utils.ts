import type { Request, NextFunction } from "express"
import { ZodError, type AnyZodObject, type z } from "zod"

interface GetRequestParams<zodSchemaGeneric> {
  schema: zodSchemaGeneric
  req: Request
  next: NextFunction
}

export async function getRequestParams<zodSchemaGeneric extends AnyZodObject>({
  schema,
  req,
  next,
}: GetRequestParams<zodSchemaGeneric>): Promise<z.infer<zodSchemaGeneric>> {
  try {
    return schema.parseAsync(req)
  } catch (error) {
    if (error instanceof ZodError) {
      throw next(new Error(error.message))
    }
    throw next(new Error(JSON.stringify(error)))
  }
}
