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
      acc.push(...cur.frontMatter.tags)
      return acc
    }, []),
    _.uniq,
    _.join(" ")
  )(projects)
  return (
    <>
      <NextSeo
        title="Projects | Phillip Maier"
        description={allCategories}
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
