import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { AboutPage } from "../../components/pages/About"
import { AboutMe } from "../../components/pages/About/about-typings"
import { NextSeo } from "next-seo"

interface AboutPageRendererProps {
  content: string
  frontMatter: AboutMe
}

/*
  The About page is a simple Markdown page that explains what I'm all about
*/
const AboutPageRenderer: React.FC<AboutPageRendererProps> = (props) => (
  <>
    <NextSeo
      title="About | Phillip Maier"
      description="Phillip Maier is a Software engineer with a deep love for Open Source, and helping others!"
    />
    <AboutPage {...props} />
  </>
)

export default AboutPageRenderer

export const getStaticProps = async (): Promise<{
  props: AboutPageRendererProps
}> => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("components/pages/About/AboutMe.md"))
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
