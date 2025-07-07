import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"

import { config } from "dotenv"

config()

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: `https://phillipmaier.com'`,
  integrations: [mdx(), sitemap(), tailwind(), react()],
  server: {
    host: true,
  },
})
