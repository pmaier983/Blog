import React from "react"
import fs from "fs"
import _ from "lodash/fp"
import matter from "gray-matter"
import { NextSeo } from "next-seo"

import { ProjectsPage } from "../../components/pages/Project/ProjectsPage"
import { ProjectOutline } from "../../components/pages/Project/project-typings"

const ProjectRenderer: React.FC<{ projects: ProjectOutline[] }> = ({
  projects,
}) => {
  const allCategories = _.flow(
    _.reduce((acc: string[], cur: ProjectOutline) => {
      acc.push(...cur.frontMatter.categories)
      return acc
    }, []),
    _.uniq,
    _.join(" ")
  )(projects)
  return (
    <>
      <NextSeo title="Projects | Phillip Maier" description={allCategories} />
      <ProjectsPage projects={projects} />
    </>
  )
}

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
