import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"
import { MaterialIcon } from "./MaterialIcon"

import { copyToClipboard } from "./utils/utils"

const StyledContainer = styled.div`
  position: absolute;
  height: 275px;
  width: 275px;
`

const StyledProfilePicture = styled.img`
  height: 275px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
`

const StyledGithubIcon = styled.img`
  height: 52px;
  z-index: 1;
`

const StyledLinkedinIcon = styled.img`
  height: 30px;
  position: absolute;
  left: 10px;
`

const StyledTwitterIcon = styled.img`
  height: 25px;
`

const StyledWorldIcon = styled.img`
  height: 60px;
  position: absolute;
  left: -3px;
  z-index: 1;
`

const StyledHighlightedText = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.oceanBlue};
`

/* 
The personal bubble is a runescape-esque profile 
with smaller links surrounding a profile picture
*/
export const PersonalBubbleLarge: React.FC = () => {
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
          top="28%"
          left="-47px"
          diameter="50px"
          popoutText="Github"
          popoutTransform="translate(-55px, 0)"
        >
          <StyledGithubIcon src="githubLogo.png" />
        </LinkBubble>
      </a>
      <a href="https://www.linkedin.com/in/phillip-maier-3a4161102/">
        <LinkBubble
          top="50%"
          left="-50px"
          diameter="50px"
          popoutText="Linkedin"
          popoutTransform="translate(-55px, 0)"
        >
          <StyledLinkedinIcon src="LinkedinLogo.png" />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983">
        <LinkBubble
          top="70.5%"
          left="-30px"
          diameter="50px"
          popoutText="Twitter"
          popoutTransform="translate(-55px, 0)"
        >
          <StyledTwitterIcon src="TwitterLogo.png" />
        </LinkBubble>
      </a>

      <LinkBubble
        top="87%"
        left="10px"
        diameter="50px"
        popoutText="Email"
        popoutTransform="translate(-55px, 0)"
        onClick={copyToClip}
      >
        <MaterialIcon name="email" size="35px" zIndex={1} />
      </LinkBubble>
      <LinkBubble2
        top="78%"
        left="220px"
        diameter="50px"
        popoutText="Boston"
        popoutTransform="translate(70px, 0)"
        color={theme.colors.brown}
      >
        <StyledWorldIcon src="RSWorld.png" />
      </LinkBubble2>
    </StyledContainer>
  )
}
