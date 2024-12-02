import { z } from "zod"

export const envSchema = z.object({
  // The Local .env file
  PROJECT_ID: z.string().min(1),
  ZONE: z.string().min(1),
  INSTANCE_NAME: z.string().min(1),
  LOCATION: z.string().min(1),
  ZONE_NAME: z.string().min(1),

  // The global .env file
  SUPABASE_URL: z.string().min(1),
  SUPABASE_ANON_KEY: z.string().min(1),

  DATABASE_URL: z.string().min(1),
  PUBLIC_BACKEND_API_URL: z.string().min(1),
  PUBLIC_FRONTEND_URL: z.string().min(1),
  // RE-ENABLE if using Docker Compose
  PUBLIC_IN_NETWORK_BACKEND_API_URL: z.string().min(1),

  DOCKER_REGISTRY: z.string().min(1),
  AWS_ACCOUNT_ID: z.string().min(1),
})
