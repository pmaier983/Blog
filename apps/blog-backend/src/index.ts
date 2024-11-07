import cors from "cors"
import express from "express"
import pino from "pino-http"
import { rateLimit } from "express-rate-limit"

import { PORT } from "~/const"
import { buttonsRoute } from "~/api/buttons"

import "dotenv/config"

const logger = pino()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
const app = express()

app.use(
  cors({
    origin: "*",
  }),
)
app.use(express.json())
app.use(limiter)
app.use(logger)

app.use("/api/:version/buttons", buttonsRoute)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
