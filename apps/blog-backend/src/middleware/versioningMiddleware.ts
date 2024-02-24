import type { Request, Response, NextFunction } from "express"

export const versioningMiddleware = ({ version }: { version: number }) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!req.params.version) {
      req.log.error("API version not found.")
      return next(new Error("API version not found. (Try using api/v1/*"))
    }
    const requestVersion = parseInt(req.params.version.substring(1)) // removes the "v" and turns into a number
    if (typeof requestVersion !== "number") {
      return next(new Error("Invalid API version requested."))
    } else if (requestVersion >= version) {
      return next()
    }
    return next("route") // skip to the next route
  }
}
