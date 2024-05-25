import { defineConfig, passthroughImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"

import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  image: {
    service: passthroughImageService(),
  },
  site: "https://phillipmaier.com",
  integrations: [mdx(), sitemap(), tailwind(), react()],
  adapter: node({
    mode: "standalone",
  }),
})
