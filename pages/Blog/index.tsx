import React from "react"
import fs from "fs"
import matter from "gray-matter"
import Head from "next/head"

import { BlogPage } from "../../components/pages/Blog"
import { PostOutline } from "../../components/pages/Blog/post-typings"

const BlogRenderer: React.FC<{ posts: PostOutline[] }> = ({ posts }) => (
  <>
    <Head>
      <title>Phillip Maier&apos;s Site</title>
    </Head>
    <BlogPage posts={posts} />
  </>
)

export const getStaticProps = async (): Promise<{
  props: {
    posts: PostOutline[]
  }
}> => {
  const files: string[] = fs.readdirSync(
    `${process.cwd()}/components/pages/Blog/posts`
  )

  const posts = files.map((filename) => {
    const { data } = matter(
      fs.readFileSync(`components/pages/Blog/posts/${filename}`).toString()
    )

    return {
      slug: filename.replace(".md", ""),
      frontMatter: data,
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default BlogRenderer
