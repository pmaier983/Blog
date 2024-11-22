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
  // TODO: change this to be phillipmaier.com once complete!
  site: "https://gaulish.io",
  integrations: [mdx(), sitemap(), tailwind(), react()],
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: true,
  },
})
