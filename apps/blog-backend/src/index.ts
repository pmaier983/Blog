import cors from "cors"
import express from "express"
import pino from "pino-http"

import { PORT } from "~/const"
import { buttonsRoute } from "~/api/buttons"

import "dotenv/config"

const logger = pino()

const app = express()

app.use(
  cors({
    origin: "*",
  })
)
app.use(logger)
app.use(express.json())

app.use("/api/:version/buttons", buttonsRoute)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
