import React from "react"
import fs from "fs"
import _ from "lodash/fp"
import matter from "gray-matter"
import { NextSeo } from "next-seo"

import { BlogPage } from "../../components/pages/Blog"
import { PostOutline } from "../../components/pages/Blog/post-typings"

const BlogRenderer: React.FC<{ posts: PostOutline[] }> = ({ posts }) => {
  const allTags = _.flow(
    _.reduce((acc: string[], cur: PostOutline) => {
      acc.push(...cur.frontMatter.tags)
      return acc
    }, []),
    _.uniq,
    _.join(", ")
  )(posts)
  return (
    <>
      <NextSeo
        title="Blog | Phillip Maier"
        description={`${allTags}. A Blog containing Phillip Maier's Software engineering knowledge, from front-end to back end.`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://phillipmaier.com/project",
          title: "Phillip Maier",
          description: "",
          images: [
            {
              url:
                "https://s3.us-east-2.amazonaws.com/phillipmaier.com/GreetingOG.png",
              height: 1200,
              width: 630,
              alt: `Picture of a friendly smiling Phillip Maier with the following text to the right: 
                "I'm an engineer who's passionate about open source and helping others!" `,
            },
          ],
        }}
        twitter={{
          handle: "@pmaier983",
          cardType: "summary_large_image",
        }}
      />
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
