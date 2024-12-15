import { Home, Book, Folder } from "lucide-astro"
import type React from "react"

// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Phillip Maier's Personal Website"
export const SITE_DESCRIPTION =
  "The personal website of Phillip Maier. A place to share my thoughts, projects, and cool links."

export const NAVIGABLE_PAGES: {
  title: string
  href: string
  Icon: React.FC
}[] = [
  {
    title: "Home",
    href: "/",
    Icon: Home,
  },
  {
    title: "Cool Links",
    href: "/cool-links",
    Icon: Book,
  },
  {
    title: "Posts",
    href: "/posts",
    Icon: Folder,
  },
]
