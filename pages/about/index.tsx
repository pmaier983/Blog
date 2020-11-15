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
      description="Who Phillip Maier is, and why he created this site and writes software"
      openGraph={{
        type: "profile",
        locale: "en_IE",
        url: "https://phillipmaier.com/about",
        site_name: "Phillip Maier",
        title: "Phillip Maier",
        profile: {
          firstName: "Phillip",
          lastName: "Maier",
          username: "pmaier983",
          gender: "male",
        },
        description:
          "Hi, I'm Phillip. I'm an engineer who's passionate about open source and helping others!",
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
