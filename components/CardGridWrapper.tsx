import React from "react"
import _ from "lodash/fp"
import styled from "styled-components"

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px 5% 40px 5%;
  margin: 0;
`

interface CardGridWrapperProps {
  CardComponent: React.FC
  passPropsDirectly?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards: any[]
}

/*
  Wraps a list of Cards that should respond to window size changes and wrap correspondingly 
*/
export const CardGridWrapper: React.FC<CardGridWrapperProps> = ({
  CardComponent,
  passPropsDirectly = false,
  cards,
}) => {
  const sortedCards = _.sortBy("frontMatter.date", cards).reverse()
  const children = sortedCards.map((card) => {
    return passPropsDirectly ? (
      <CardComponent key={card}>{card}</CardComponent>
    ) : (
      <CardComponent {...card} key={_.get("slug", card)} />
    )
  })
  return <StyledContainer>{children}</StyledContainer>
}
