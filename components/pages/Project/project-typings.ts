export interface Project {
  title: string
  description: string
  date: string
  author: string
  categories: string[]
  keywords: string[]
  bannerPath: string
  bannerPlaceholderPath: string
  bannerHeight: number
  bannerWidth: number
  bannerCredit: string
  bannerDescription: string
  projectURL: string
}

export interface ProjectOutline {
  slug: string
  frontMatter: Project
}
