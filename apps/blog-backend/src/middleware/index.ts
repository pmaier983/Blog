import { versioningMiddleware } from "~/middleware/versioningMiddleware"

type MiddlewareInputs = Parameters<typeof versioningMiddleware>[0]

export const middleware = ({ version }: MiddlewareInputs) => [
  versioningMiddleware({ version }),
]
