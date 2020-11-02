import React from "react"
import styled from "styled-components"

const StyledHighlightedText = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.oceanBlue};
`

export const ClipboardConfirmationAlert: React.FC = () => (
  <span>
    You copied&nbsp;
    <StyledHighlightedText href="mailto:pmaier983@gmail.com">
      pmaier983@gmail.com
    </StyledHighlightedText>
    &nbsp;to clipboard
  </span>
)
