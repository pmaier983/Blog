import { z } from "zod"

export const envSchema = z.object({
  SERVICE_ACCOUNT: z.string().min(1),
})
