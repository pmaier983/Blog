import React from "react"
import styled, { css } from "styled-components"

interface StyledButtonContainerProps {
  diameter: string
  top?: string
  left?: string
  bottom?: string
  right?: string
  color?: string
  onClick?: () => void
}

const StyledButtonContainer = styled.button<StyledButtonContainerProps>`
  all: unset;
  ${({ diameter, top, left, bottom, right, color, theme }) => css`
    height: ${diameter};
    width: ${diameter};
    top: ${top};
    left: ${left};
    bottom: ${bottom};
    right: ${right};
    border: 5px solid ${theme.colors.lightBrown};
    background-color: ${color || theme.colors.gitCommit0};
  `}
  position: absolute;
  display: flex;
  align-items: center;
  color: black;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`

interface StyledPopoutTextProps {
  popoutTransform?: string
}

const StyledPopoutText = styled.span<StyledPopoutTextProps>`
  position: absolute;
  display: flex;
  text-align: center;
  transition: 0.5s;
  background-color: white;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.lightBrown};
  padding: 3px;
  border-radius: 5px;
  white-space: pre;
  font-size: 14px;
  visibility: hidden;
  opacity: 0;
  color: black;
  ${StyledButtonContainer}:hover & {
    visibility: visible;
    opacity: 1;
    /* 
    For some baffling reason I need two identical files to get this transform to stop being overridden
    My bet is something is wrong with how styled components assigns id's to the dom nodes
    */
    transform: ${({ popoutTransform }) => popoutTransform};
  }
  ${StyledButtonContainer}:focus & {
    visibility: visible;
    opacity: 1;
    /* 
    For some baffling reason I need two identical files to get this transform to stop being overridden
    My bet is something is wrong with how styled components assigns id's to the dom nodes
    */
    transform: ${({ popoutTransform }) => popoutTransform};
  }
`

interface LinkBubbleSmallProps
  extends StyledButtonContainerProps,
    StyledPopoutTextProps {
  popoutText?: string
  popoutTransform?: string
}

/*
  This is a circular link "bubble" that when hovered displays text! that pops out :D
*/
export const LinkBubble: React.FC<LinkBubbleSmallProps> = ({
  children,
  popoutText,
  popoutTransform,
  ...rest
}) => {
  return (
    <StyledButtonContainer {...rest}>
      {children}
      <StyledPopoutText popoutTransform={popoutTransform}>
        {popoutText}
      </StyledPopoutText>
    </StyledButtonContainer>
  )
}
