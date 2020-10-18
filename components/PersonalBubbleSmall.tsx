import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"
import { MaterialIcon } from "./MaterialIcon"

import { copyToClipboard } from "./utils/utils"

const StyledContainer = styled.div`
  position: absolute;
  height: 175px; // for some reason next can't handle importing NavBarWidth
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledProfilePicture = styled.img`
  border-radius: 50%;
  max-width: 85%;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
`

const StyledGithubIcon = styled.img`
  height: 30px;
`

const StyledLinkedinIcon = styled.img`
  height: 20px;
`

const StyledWorldIcon = styled.img`
  height: 38px;
`

const StyledHighlightedText = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.oceanBlue};
`

/* 
The personal bubble is a runescape-esque profile 
with smaller links surrounding a profile picture
*/
export const PersonalBubbleSmall: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [, dispatchAlert] = useAlertContext()

  const copyToClip = () => {
    copyToClipboard("pmaier983@gmail.com")
    dispatchAlert({
      type: ALERT_ACTIONS.SHOW_ALERT,
      payload: (
        <span>
          You copied&nbsp;
          <StyledHighlightedText href="mailto:pmaier983@gmail.com">
            pmaier983@gmail.com
          </StyledHighlightedText>
          &nbsp;to clipboard
        </span>
      ),
    })
  }
  return (
    <StyledContainer>
      <StyledProfilePicture
        src="PictureOfSelf.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
      />
      <a href="https://github.com/pmaier983">
        <LinkBubble
          diameter="30px"
          top="49px"
          left="-20px"
          popoutText="Github"
          popoutTransform="translate(-45px, 0)"
        >
          <StyledGithubIcon src="githubLogo.png" />
        </LinkBubble>
      </a>
      <a href="https://www.linkedin.com/in/phillip-maier-3a4161102/">
        <LinkBubble
          diameter="30px"
          top="90px"
          left="-17px"
          popoutText="Linkedin"
          popoutTransform="translate(-45px, 0)"
        >
          <StyledLinkedinIcon src="LinkedinLogo.png" />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983">
        <LinkBubble
          diameter="30px"
          top="127px"
          left="0px"
          popoutText="Twitter"
          popoutTransform="translate(-45px, 0)"
        >
          <StyledLinkedinIcon src="TwitterLogo.png" />
        </LinkBubble>
      </a>
      <LinkBubble
        diameter="30px"
        top="154px"
        left="31px"
        onClick={copyToClip}
        popoutText="Email Me"
        popoutTransform="translate(-45px, 0)"
      >
        <MaterialIcon name="email" />
      </LinkBubble>
      <LinkBubble2
        diameter="30px"
        top="130px"
        left="125px"
        popoutText="Boston (for now)"
        popoutTransform="translate(0, 38px)"
        color={theme.colors.brown}
      >
        <StyledWorldIcon src="RSWorld.png" />
      </LinkBubble2>
    </StyledContainer>
  )
}
