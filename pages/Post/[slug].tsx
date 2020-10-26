import React from "react"
import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { PostPage } from "../../components/pages/Post"
import { Post } from "../../components/pages/Post/post-typings"

interface PostRendererProps {
  content: string
  frontMatter: Post
}

const PostRenderer: React.FC<PostRendererProps> = (props) => (
  <>
    <Head>
      <title>Phillip Maier&apos;s Site</title>
    </Head>
    <PostPage {...props} />
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
    paths: fs.readdirSync("components/pages/post/posts").map((filename) => ({
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
    .readFileSync(path.join("components/pages/post/posts", slug + ".md"))
    .toString()

  const { data, content } = matter(markdownWithMetadata)

  return {
    props: {
      content: `# ${data.title}\n${content}`,
      frontMatter: {
        ...data,
      },
    },
  }
}
