import React from "react"

import { CardGridWrapper } from "../../CardGridWrapper"
import { ConfirmationPopup } from "../../ConfirmationPopup"
import { ScrollNavPage } from "../ScrollNavPage"
import { PostCard } from "./PostCard"

import { PostOutline } from "../Post/post-typings"

/*
  A wrapper of the BlogPage that puts the confirmation Popup in place
*/
export const BlogPage: React.FC<{ posts: PostOutline[] }> = ({ posts }) => (
  <ScrollNavPage>
    <ConfirmationPopup />
    <CardGridWrapper CardComponent={PostCard} cards={posts} />
  </ScrollNavPage>
)
