import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { LinkBubble2 } from "./LinkBubble2"

const StyledContainer = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
`

const StyledProfilePicture = styled.img`
  height: 200px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
`

const StyledWorldIcon = styled.img`
  height: 60px;
  position: absolute;
  left: -3px;
  z-index: 1;
`

/* 
  The personal bubble is a runescape-esque profile 
  with smaller links surrounding a profile picture
*/
export const PersonalBubbleMobile: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <StyledContainer>
      <StyledProfilePicture
        src="/PictureOfSelf.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
      />
      <LinkBubble2
        top="78%"
        left="140px"
        diameter="50px"
        popoutText="Boston (for now)"
        popoutTransform="translate(70px, 0)"
        color={theme.colors.brown}
      >
        <StyledWorldIcon src="/Icons/RSWorld.png" />
      </LinkBubble2>
    </StyledContainer>
  )
}
