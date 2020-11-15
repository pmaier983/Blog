import React from "react"
import fs from "fs"
import _ from "lodash/fp"
import path from "path"
import matter from "gray-matter"
import { NextSeo } from "next-seo"

import { MarkdownPage } from "../../components/MarkdownPage"
import { ProjectOutline } from "../../components/pages/Project/project-typings"

interface ProjectRendererProps extends ProjectOutline {
  content: string
}

const ProjectRenderer: React.FC<ProjectRendererProps> = ({
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

export default ProjectRenderer

interface StaticPaths {
  params: { slug: string }
}

export const getStaticPaths = async (): Promise<{
  paths: StaticPaths[]
  fallback: boolean
}> => {
  return {
    paths: fs
      .readdirSync("components/pages/Project/projects")
      .map((filename) => ({
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
  props: ProjectRendererProps
}> => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("components/pages/Project/projects", slug + ".md"))
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
