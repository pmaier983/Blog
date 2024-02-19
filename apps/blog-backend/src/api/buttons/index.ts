import express from "express"
import { getButton } from "~/api/buttons/getButton"
import { incrementButton } from "~/api/buttons/incrementButton"
import { middleware } from "~/middleware"

const buttonsRoute = express.Router({ mergeParams: true })

buttonsRoute.get(
  "/:name",
  middleware({
    version: 1,
  }),
  getButton.V1
)

buttonsRoute.post(
  "/:name",
  middleware({
    version: 1,
  }),
  incrementButton.V1
)

export { buttonsRoute }
