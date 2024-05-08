import { defineConfig, passthroughImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), react()],
})
