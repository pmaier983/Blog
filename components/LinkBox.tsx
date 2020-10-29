import React from "react"
import styled, { css } from "styled-components"

interface StyledContainerProps {
  color: string
  transition?: boolean
  size: string
}

const StyledContainer = styled.div<StyledContainerProps>`
  ${({ color, size }) => css`
    height: ${size};
    width: ${size};
    border: 2px solid ${color};
    background-color: ${color};
  `}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: opacity 0.5s ease-in-out;
  :hover {
    opacity: ${({ transition }) => (transition ? 0 : 1)};
    transition: opacity 0.5s ease-in-out;
  }
  :active {
    opacity: ${({ transition }) => (transition ? 0 : 1)};
    transition: opacity 0.5s ease-in-out;
  }
`

type LinkBox = StyledContainerProps

/*
  Container that resembles a github commit box, but can also have a link inside
  If no children are present it disappear on hover
*/
export const LinkBox: React.FC<LinkBox> = ({ children, ...rest }) => (
  <StyledContainer {...rest} transition={!children}>
    {children}
  </StyledContainer>
)
