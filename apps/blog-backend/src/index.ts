import cors from "cors"
import express from "express"

import { PORT } from "~/const"
import { buttonsRoute } from "~/api/buttons"

import "dotenv/config"

const app = express()

app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())

app.use("/api/:version/buttons", buttonsRoute)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
