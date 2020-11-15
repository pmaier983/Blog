import React from "react"
import fs from "fs"
import _ from "lodash/fp"
import path from "path"
import matter from "gray-matter"
import { NextSeo } from "next-seo"

import { MarkdownPage } from "../../components/MarkdownPage"
import { PostOutline } from "../../components/pages/Blog/post-typings"

interface PostRendererProps extends PostOutline {
  content: string
}

const PostRenderer: React.FC<PostRendererProps> = ({
  slug,
  frontMatter: {
    title,
    description,
    modifiedTime,
    publishedTime,
    authors,
    tags,
    bannerPath,
    bannerDescription,
  },
  content,
}) => (
  <>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: "article",
        locale: "en_IE",
        url: `https://phillipmaier.com/${slug}`,
        site_name: "Phillip Maier",
        title,
        description,
        article: {
          modifiedTime,
          publishedTime,
          authors,
          section: "Technology",
          tags,
        },
        images: [
          {
            url: `https://s3.us-east-2.amazonaws.com/phillipmaier.com/${_.last(
              bannerPath.split("/")
            )}`,
            height: 1200,
            width: 630,
            alt: bannerDescription,
          },
        ],
      }}
    />
    <MarkdownPage content={content} />
  </>
)

export default PostRenderer

interface StaticPaths {
  params: { slug: string }
}

export const getStaticPaths = async (): Promise<{
  paths: StaticPaths[]
  fallback: boolean
}> => {
  return {
    paths: fs.readdirSync("components/pages/Blog/posts").map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params: { slug },
}: StaticPaths): Promise<{
  props: PostRendererProps
}> => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("components/pages/Blog/posts", slug + ".md"))
    .toString()

  const { data, content } = matter(markdownWithMetadata)

  return {
    props: {
      content: `# ${data.title}\n${content}`,
      slug,
      frontMatter: {
        ...data,
      },
    },
  }
}
