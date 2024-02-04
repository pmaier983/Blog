// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Phillip Maier's Personal Website"
export const SITE_DESCRIPTION =
  "A place to learn about Phillip, and a place for Phillip to experiment."

// ITTT: Add a new icon to the ICONS object & icons.svg together!
export const ICONS = {
  menu: "menu",
  "refresh-cw": "refresh-cw",
  close: "close",
  "right-carrot": "right-carrot",
  "down-carrot": "down-carrot",
  home: "home",
  book: "book",
  projects: "projects",
} as const

export type Icon = keyof typeof ICONS

export const NAVIGABLE_PAGES = [
  {
    title: "Home",
    href: "/",
    icon: ICONS.home,
  },
  {
    title: "Cool Links",
    href: "/cool-links",
    icon: ICONS.book,
  },
  {
    title: "Project Links",
    href: "/project-links",
    icon: ICONS.projects,
  },
]
