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
  text-align: center;
  font-size: 25px;
  max-width: 600px;
  padding: 20px 0;
`

interface StyledPaddingProps {
  size: string
}

const StyledRowPadding = styled.div<StyledPaddingProps>`
  height: ${({ size }) => size};
`

// TODO: replace lodash/ make sure space is used effectively
// TODO: go through advanced Next.js features
// TODO: switch to emotion (11 is arriving out soon!)
// TODO: comment all
// TODO: Error page
export const HomePageDesktop: React.FC = () => (
  <StyledContainer>
    <StyledProfileContainer>
      <PersonalBubbleLarge />
    </StyledProfileContainer>
    <StyledRowPadding size="20px" />
    <StyledIntroduction>
      Hi &nbsp;👋&nbsp;&nbsp; I&apos;m Phillip Maier. I&apos;m a software
      engineer with passion for open-source and helping others.
    </StyledIntroduction>
    <GitLinkBoxes />
    <ConfirmationPopup />
  </StyledContainer>
)
