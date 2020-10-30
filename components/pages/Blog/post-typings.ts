export interface Post {
  title: string
  description: string
  date: string
  author: string
  categories: string[]
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
