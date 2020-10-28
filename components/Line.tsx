import React from "react"
import styled, { css } from "styled-components"

interface StyledContainerProp {
  bottom?: boolean
  top?: boolean
}

const StyledContainer = styled.div<StyledContainerProp>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  ${({ bottom, top }) => {
    if (top) {
      return css`
        align-self: flex-start;
        margin-top: 6%;
      `
    }
    if (bottom) {
      return css`
        align-self: flex-end;
        margin-bottom: 6%;
      `
    }
  }}
`

interface StyledHorizontalLineProps {
  color?: string
}

const StyledHorizontalLine = styled.div<StyledHorizontalLineProps>`
  height: 3px;
  background-color: ${({ color = "white" }) => color};
  width: 100%;
`

interface LineProps extends StyledContainerProp, StyledHorizontalLineProps {}

export const Line: React.FC<LineProps> = ({ color, ...rest }) => {
  return (
    <StyledContainer {...rest}>
      <StyledHorizontalLine color={color} />
    </StyledContainer>
  )
}
