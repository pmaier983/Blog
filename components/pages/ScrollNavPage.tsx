import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { ALERT_ACTIONS, useAlertContext } from "../contexts/AlertProvider"
import { ClipboardConfirmationAlert } from "../contexts/Alerts"
import { useMediaQuery } from "../hooks"
import { NavBar, NavBarWidth } from "../NavBar"
import { NavigationButton } from "../NavigationButton"
import { StyledSimplePageContainer } from "../sharedStyles"
import { copyToClipboard } from "../utils/utils"

const StyledScrollList = styled.div`
  width: calc(100% - ${NavBarWidth});
  @media (max-width: ${({ theme }) => `${theme.breakpoints.mobile}px`}) {
    width: 100%;
  }
`

const StyledFooter = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-top: 2px dashed ${({ theme }) => theme.colors.gitCommit0};
`

const StyledButton = styled.button`
  all: unset;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const StyledATag = styled.a`
  all: unset;
  :hover {
    cursor: pointer;
  }
`

/*
  This is a wrapper for any page that wants an infinite scroll with a fixed navBar on the right side.
*/
export const ScrollNavPage: React.FC = ({ children }) => {
  const theme = useContext(ThemeContext)
  const isMobile = useMediaQuery(theme.breakpoints.mobile)
  const [, dispatchAlert] = useAlertContext()

  const copyToClip = () => {
    copyToClipboard("pmaier983@gmail.com")
    dispatchAlert({
      type: ALERT_ACTIONS.SHOW_ALERT,
      payload: <ClipboardConfirmationAlert />,
    })
  }
  return (
    <StyledSimplePageContainer>
      <StyledScrollList>{children}</StyledScrollList>
      {isMobile ? <NavigationButton /> : <NavBar />}
      <StyledFooter>
        <StyledATag>Github</StyledATag>
        <StyledATag>Linkedin</StyledATag>
        <StyledATag>Twitter</StyledATag>
        <StyledButton onClick={copyToClip} tabIndex={-1}>
          Email
        </StyledButton>
      </StyledFooter>
    </StyledSimplePageContainer>
  )
}
