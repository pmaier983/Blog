import React from "react"
import { MarkdownPage } from "../../MarkdownPage"

import { AboutMe } from "./about-typings"

interface AboutPageProps {
  content: string
  frontMatter: AboutMe
}

/*
  A simple page explaining who I am and what I do
*/
export const AboutPage: React.FC<AboutPageProps> = (props) => (
  <MarkdownPage {...props} />
)
