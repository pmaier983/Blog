import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { useMediaQuery } from "../hooks"

import { NavBar, NavBarWidth } from "../NavBar"
import { NavigationButton } from "../NavigationButton"
import { StyledSimplePageContainer } from "../sharedStyles"

const StyledScrollList = styled.div`
  width: calc(100% - ${NavBarWidth});
  @media (max-width: ${({ theme }) => `${theme.breakpoints.mobile}px`}) {
    width: 100%;
  }
`

/*
  This is a wrapper for any page that wants an infinite scroll with a fixed navBar on the right side.
*/
export const ScrollNavPage: React.FC = ({ children }) => {
  const theme = useContext(ThemeContext)
  const isMobile = useMediaQuery(theme.breakpoints.mobile)
  return (
    <StyledSimplePageContainer>
      <StyledScrollList>{children}</StyledScrollList>
      {isMobile ? <NavigationButton /> : <NavBar />}
    </StyledSimplePageContainer>
  )
}
