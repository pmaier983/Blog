import React from "react"
import fs from "fs"
import _ from "lodash/fp"
import matter from "gray-matter"
import { NextSeo } from "next-seo"

import { BlogPage } from "../../components/pages/Blog"
import { PostOutline } from "../../components/pages/Blog/post-typings"

const BlogRenderer: React.FC<{ posts: PostOutline[] }> = ({ posts }) => {
  const allCategories = _.flow(
    _.reduce((acc: string[], cur: PostOutline) => {
      acc.push(...cur.frontMatter.categories)
      return acc
    }, []),
    _.uniq,
    _.join(" ")
  )(posts)
  return (
    <>
      <NextSeo title="Blog | Phillip Maier" description={allCategories} />
      <BlogPage posts={posts} />
    </>
  )
}

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
