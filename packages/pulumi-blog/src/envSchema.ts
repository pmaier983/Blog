import { z } from "zod"

export const envSchema = z.object({
  PROJECT_ID: z.string().min(1),
  ZONE: z.string().min(1),
  INSTANCE_NAME: z.string().min(1),
})
