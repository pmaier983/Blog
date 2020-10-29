import React from "react"
import { MarkdownPage } from "../../MarkdownPage"

import { AboutMe } from "./about-typings"

interface AboutPageProps {
  content: string
  frontMatter: AboutMe
}

export const AboutPage: React.FC<AboutPageProps> = (props) => (
  <MarkdownPage {...props} />
)
