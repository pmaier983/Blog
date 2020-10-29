import React from "react"
import styled from "styled-components"

interface StyledContainerProps {
  width?: string
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3%;
  margin: 0;
  max-width: ${({ width }) => width};
  width: ${({ width }) => width};
`

const StyledCategory = styled.div`
  padding: 0 2px;
  border: 2px solid ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.brown};
  border-radius: 5px;
  margin: 1px;
  font-size: 12px;
`

interface CategoryCardsProps extends StyledContainerProps {
  cards: string[]
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  cards,
  ...rest
}) => {
  const children = cards.map((category) => (
    <StyledCategory key={category}>{category}</StyledCategory>
  ))
  return <StyledContainer {...rest}>{children}</StyledContainer>
}
