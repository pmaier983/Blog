import React from "react"
import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { AboutPage } from "../../components/pages/About"
import { AboutMe } from "../../components/pages/About/about-typings"

interface AboutPageRendererProps {
  content: string
  frontMatter: AboutMe
}

/*
  The About page is a simple Markdown page that explains what I'm all about
*/
const AboutPageRenderer: React.FC<AboutPageRendererProps> = (props) => (
  <>
    <Head>
      <title>Phillip Maier&apos;s Site</title>
    </Head>
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
