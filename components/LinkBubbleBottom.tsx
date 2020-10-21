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

export const LinkBubbleBottom: React.FC<LinkBubbleRightProps> = ({
  text,
  children,
  ...rest
}) => {
  return (
    <StyledContainer>
      <StyledButtonContainer {...rest}>{children}</StyledButtonContainer>
      <span>{text}</span>
    </StyledContainer>
  )
}

// import React from "react"
// import styled, { css } from "styled-components"

// const StyledContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `

// interface StyledButtonContainerProps {
//   diameter?: string
// }

// const StyledButtonContainer = styled.div<StyledButtonContainerProps>`
//   ${({ diameter, theme }) => css`
//     height: ${diameter};
//     width: ${diameter};
//     border: 5px solid ${theme.colors.lightBrown};
//   `}
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   cursor: pointer;
// `

// const StyledBackground = styled.div<StyledButtonContainerProps>`
//   ${({ diameter, theme }) => css`
//     background-color: ${theme.colors.gitCommit0};
//     height: ${diameter};
//     width: ${diameter};
//   `};
//   position: absolute;
//   border-radius: 50%;
//   z-index: 0;
// `

// const StyledText = styled.span`
//   color: black;
//   ${StyledContainer}:hover & {
//     text-decoration: underline;
//   }
//   ${StyledContainer}:focus & {
//     text-decoration: underline;
//   }
// `

// interface LinkBubbleRightProps extends StyledButtonContainerProps {
//   text?: string | React.ReactNode
//   onClick?: () => void
// }

// export const LinkBubbleBottom: React.FC<LinkBubbleRightProps> = ({
//   diameter,
//   text,
//   children,
// }) => {
//   return (
//     <StyledContainer>
//       <StyledButtonContainer diameter={diameter}>
//         {children}
//         <StyledBackground diameter={diameter} />
//       </StyledButtonContainer>
//       <StyledText>{text}</StyledText>
//     </StyledContainer>
//   )
// }
