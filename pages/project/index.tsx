import React from "react"
import fs from "fs"
import matter from "gray-matter"
import Head from "next/head"

import { ProjectsPage } from "../../components/pages/Project/ProjectsPage"
import { ProjectOutline } from "../../components/pages/Project/project-typings"

const ProjectRenderer: React.FC<{ projects: ProjectOutline[] }> = ({
  projects,
}) => (
  <>
    <Head>
      <title>Phillip Maier&apos;s Site</title>
    </Head>
    <ProjectsPage projects={projects} />
  </>
)

export const getStaticProps = async (): Promise<{
  props: {
    projects: ProjectOutline[]
  }
}> => {
  const files: string[] = fs.readdirSync(
    `${process.cwd()}/components/pages/Project/projects`
  )

  const projects = files.map((filename) => {
    const { data } = matter(
      fs
        .readFileSync(`components/pages/Project/projects/${filename}`)
        .toString()
    )

    return {
      slug: filename.replace(".md", ""),
      frontMatter: data,
    }
  })

  return {
    props: {
      projects,
    },
  }
}

export default ProjectRenderer
