import React from "react"
import styled, { css } from "styled-components"
import { paths } from "../paths"

import { NavListLink, StyledNavListProps } from "./NavListLink"
import { PersonalBubbleSmall } from "./PersonalBubbleSmall"
import { StyledRowPadding } from "./sharedStyles"

export const NavBarWidth = "175px"

const StyledContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${NavBarWidth};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile + "px"}) {
    width: 0%;
    visibility: hidden;
  }
`

const StyledPortraitContainer = styled.div`
  height: ${NavBarWidth};
`

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 10px;
  border-left: 4px solid ${({ theme }) => theme.colors.lightBrown};
  width: 65%;
`

const StyledNavListItem = styled.li<StyledNavListProps>`
  ${({ isCurrentRoute, theme }) => css`
    color: ${isCurrentRoute ? theme.colors.gitCommit4 : "black"};
    cursor: ${isCurrentRoute ? "text" : "pointer"};
    text-decoration: ${isCurrentRoute ? "underline" : "none"};
  `}
  padding: 3px;
  border-radius: 5px;
`

const StyledBorderPadding = styled(StyledRowPadding)`
  width: 50%;
  border-bottom: 4px solid ${({ theme }) => theme.colors.lightBrown};
`

export const NavBar: React.FC = () => {
  return (
    <StyledContainer>
      <StyledPortraitContainer>
        <PersonalBubbleSmall />
      </StyledPortraitContainer>
      <StyledBorderPadding size="30px" />
      <StyledNavList>
        <NavListLink
          href={paths.home.path}
          NavListComponent={StyledNavListItem}
        >
          {paths.home.label}
        </NavListLink>
        <NavListLink
          href={paths.blog.path}
          NavListComponent={StyledNavListItem}
        >
          {paths.blog.label}
        </NavListLink>
        <NavListLink
          href={paths.projects.path}
          NavListComponent={StyledNavListItem}
        >
          {paths.projects.label}
        </NavListLink>
        <NavListLink
          href={paths.about.path}
          NavListComponent={StyledNavListItem}
        >
          {paths.about.label}
        </NavListLink>
      </StyledNavList>
      <StyledRowPadding size="20px" />
    </StyledContainer>
  )
}
