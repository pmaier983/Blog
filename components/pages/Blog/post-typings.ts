export interface Post {
  title: string
  description: string
  publishedTime: string
  modifiedTime: string
  authors: string[]
  tags: string[]
  keywords: string[]
  bannerPath: string
  bannerPlaceholderPath: string
  bannerCredit: string
  bannerDescription: string
}

export interface PostOutline {
  slug: string
  frontMatter: Post
}
