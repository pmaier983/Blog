import React from "react"
import _ from "lodash/fp"
import styled from "styled-components"

import { PostOutline } from "./pages/Post/post-typings"

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3%;
  margin: 0;
`

interface CardGridWrapperProps {
  CardComponent: React.FC
  cards: PostOutline[]
}

/*
  Wraps a list of Cards that should respond to window size changes and wrap correspondingly 
*/
export const CardGridWrapper: React.FC<CardGridWrapperProps> = ({
  CardComponent,
  cards,
}) => {
  const children = cards.map((card: PostOutline) => {
    return <CardComponent {...card} key={_.get("slug", card)}></CardComponent>
  })
  return <StyledContainer>{children}</StyledContainer>
}
