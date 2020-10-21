import React from "react"

import { CardGridWrapper } from "../../CardGridWrapper"
import { ConfirmationPopup } from "../../ConfirmationPopup"
import { ScrollNavPage } from "../ScrollNavPage"
import { PostCard } from "./PostCard"

import { PostOutline } from "../Post/post-typings"

export const BlogPage: React.FC<{ posts: PostOutline[] }> = ({ posts }) => {
  console.log("the posts:", posts)
  return (
    <ScrollNavPage>
      <ConfirmationPopup />
      <CardGridWrapper CardComponent={PostCard} cards={posts} />
    </ScrollNavPage>
  )
}
