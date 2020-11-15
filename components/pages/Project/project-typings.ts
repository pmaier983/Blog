export interface Project {
  title: string
  description: string
  publishedTime: string
  modifiedTime: string
  authors: string[]
  tags: string[]
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
