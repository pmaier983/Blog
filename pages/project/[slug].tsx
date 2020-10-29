import React from "react"
import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { MarkdownPage } from "../../components/MarkdownPage"
import { Project } from "../../components/pages/Project/project-typings"

interface ProjectRendererProps {
  content: string
  frontMatter: Project
}

const ProjectRenderer: React.FC<ProjectRendererProps> = (props) => (
  <>
    <Head>
      <title>Phillip Maier&apos;s Site</title>
    </Head>
    <MarkdownPage {...props} />
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
      frontMatter: {
        ...data,
      },
    },
  }
}
