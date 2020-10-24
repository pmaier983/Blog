import React from "react"
import styled from "styled-components"

import { PersonalBubbleLarge } from "../../PersonalBubbleLarge"
import { ConfirmationPopup } from "../../ConfirmationPopup"
import { GitLinkBoxes } from "../../GitLinkBoxes"
import { StyledPageContainer } from "../../sharedStyles"

const StyledContainer = styled(StyledPageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 60%;
`

const StyledIntroduction = styled.main`
  display: flex;
  align-items: center;
  height: 10%;
  font-size: 25px;
`

interface StyledPaddingProps {
  size: string
}

const StyledRowPadding = styled.div<StyledPaddingProps>`
  height: ${({ size }) => size};
`

// TODO: Multiple Languages (and cycle through hello?)
// TODO: replace lodash/ make sure space is used effectively
// TODO: go through advanced Next.js features
// TODO: switch to emotion (11 is arriving out soon!)
// TODO: is React.FC best practice?
// TODO: hand craft HEAD for links
// TODO: comment all
// TODO: Error page
export const HomePageDesktop: React.FC = () => {
  return (
    <StyledContainer>
      <StyledProfileContainer>
        <PersonalBubbleLarge />
      </StyledProfileContainer>
      <StyledRowPadding size="20px" />
      <StyledIntroduction>
        Hi
        <span role="img" aria-label="hand waving">
          &nbsp;👋&nbsp;
        </span>
        I&apos;m Phillip, I&apos;m a full-stack
        <span
          role="img"
          aria-label="a stack of books referencing the word Fullstack"
        >
          &nbsp;📚&nbsp;
        </span>
        engineer.
      </StyledIntroduction>
      <GitLinkBoxes />
      <ConfirmationPopup />
    </StyledContainer>
  )
}
