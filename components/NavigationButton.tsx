import React, { useState } from "react"
import styled, { css } from "styled-components"

import { MaterialIcon } from "./MaterialIcon"
import { NavListLink, StyledNavListProps } from "./NavListLink"

const StyledNavPopout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gitCommit0};
  z-index: 10;
`

const StyledArtisticCircleBottom = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.gitCommit2};
  z-index: 10;
  opacity: 0.75;
`

const StyledArtisticCircleTop = styled.div`
  position: fixed;
  top: -75%;
  left: -125%;
  width: 200%;
  height: 100%;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.gitCommit1};
  z-index: 10;
  opacity: 0.75;
`

const StyledButtonContainer = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  padding: 0;
  z-index: 12;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gitCommit2};
`

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 11;
`

/*
  The currentRoute is disabled and shows as underlined 
  All other routes are not underlined and gain a border when focused/hovered
*/
const StyledNavListItem = styled.li<StyledNavListProps>`
  ${({ isCurrentRoute }) => css`
    text-decoration: ${isCurrentRoute && "underline"};
    :hover {
      box-shadow: ${!isCurrentRoute && "0 0 0 2px black"};
    }
    :focus {
      box-shadow: ${!isCurrentRoute && "0 0 0 2px black"};
    }
    cursor: ${!isCurrentRoute ? "pointer" : "text"};
  `}
  color: black;
  font-size: 30px;
  border-radius: 5px;
  padding: 10px;
  z-index: 11;
`

/*
  The Navigation button sits in the top right of the screen (position: fixed)
  and when clicked opens up a full screen nav page with the routes front and center
*/
export const NavigationButton: React.FC = () => {
  const [isNavVisible, setNavVisibility] = useState(false)
  const toggleNavVisibility = () => {
    setNavVisibility(!isNavVisible)
  }
  return (
    <>
      <StyledButtonContainer onClick={toggleNavVisibility}>
        <MaterialIcon
          name="arrow_drop_down_circle"
          size="80px"
          visible={!isNavVisible}
        />
      </StyledButtonContainer>
      {isNavVisible && (
        <StyledNavPopout>
          <StyledButtonContainer onClick={toggleNavVisibility}>
            <MaterialIcon name="cancel" size="80px" />
          </StyledButtonContainer>
          <StyledArtisticCircleBottom />
          <StyledArtisticCircleTop />
          <StyledNavList>
            <NavListLink href="/" NavListComponent={StyledNavListItem}>
              Home
            </NavListLink>
            <NavListLink href="/Blog" NavListComponent={StyledNavListItem}>
              Blog
            </NavListLink>
            <NavListLink href="/Projects" NavListComponent={StyledNavListItem}>
              Projects
            </NavListLink>
            <NavListLink href="/About" NavListComponent={StyledNavListItem}>
              About Me
            </NavListLink>
          </StyledNavList>
        </StyledNavPopout>
      )}
    </>
  )
}
