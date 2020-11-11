import React from "react"
import styled, { css } from "styled-components"

interface StyledButtonContainerProps {
  diameter: string
  color?: string
  onClick?: () => void
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const StyledButtonContainer = styled.button<StyledButtonContainerProps>`
  all: unset;
  ${({ diameter, color, theme }) => css`
    height: ${diameter};
    width: ${diameter};
    border: 5px solid ${theme.colors.lightBrown};
    background-color: ${color || theme.colors.gitCommit0};
  `}
  display: flex;
  align-items: center;
  color: black;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`

interface LinkBubbleRightProps extends StyledButtonContainerProps {
  text?: string | React.ReactNode
  onClick?: () => void
}

/* 
  Similar to LinkBubble, but it has permanent text below it.
*/
export const LinkBubbleBottom: React.FC<LinkBubbleRightProps> = ({
  text,
  children,
  ...rest
}) => {
  return (
    <StyledContainer>
      <StyledButtonContainer tabIndex={-1} {...rest}>
        {children}
      </StyledButtonContainer>
      <span>{text}</span>
    </StyledContainer>
  )
}
