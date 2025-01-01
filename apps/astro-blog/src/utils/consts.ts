import { atom } from "jotai"
import { Home, Book, Folder } from "lucide-react"
import { QueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { httpBatchLink } from "@trpc/client"

import { TRPC_URL, trpcReactQuery } from "~/utils/client"

export const SITE_TITLE = "Phillip Maier's Personal Website"
export const SITE_DESCRIPTION =
  "The personal website of Phillip Maier. A place to share my thoughts, projects, and cool links."

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/phillip-maier-3a4161102/"
export const GITHUB_URL = "https://github.com/pmaier983"
export const TWITTER_URL = "https://x.com/pmaier983"

export const queryClientAtom = atom(new QueryClient())

export const trpcQueryClientAtom = atom(
  trpcReactQuery.createClient({
    links: [
      httpBatchLink({
        url: TRPC_URL,
      }),
    ],
  }),
)

export const NAVIGABLE_PAGES: {
  title: string
  href: string
  Icon: typeof Home
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
    title: "Projects",
    href: "/projects",
    Icon: Folder,
  },
]

export interface Project {
  title: string
  description: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    title: "React Hook Form",
    description:
      "I was a core contributor to the project. Helping create the most popular form library for react with over 40k github stars and over 6 million npm downloads per day",
    link: "https://react-hook-form.com/",
  },
  {
    title: "Detective ML",
    description: "A experiment in creating an AI based detective game.",
    link: "https://detectiveml.com/",
  },
  {
    title: "SuperCTF",
    description:
      "An IO game with over 100k players. Several 1000 concurrently at its peak. I was the backend muscle for the project.",
    link: "https://critkitchen.com/superctf",
  },
]

export const CoolLinkSchema = z.object({
  title: z.string(),
  links: z.array(z.string()),
  name: z.string(),
})

export type CoolLink = z.infer<typeof CoolLinkSchema>
