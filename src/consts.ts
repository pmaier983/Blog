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
}

export type Icon = keyof typeof ICONS

export const NAVIGABLE_PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Cool Links",
    href: "/cool-links",
  },
  {
    title: "Project Links",
    href: "/project-links",
  },
]
