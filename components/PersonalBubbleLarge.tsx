import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"
import { StyledIcon } from "./sharedStyles"

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
        src="/PictureOfSelf.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
      />
      <a href="https://github.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          top="28%"
          left="-47px"
          diameter="50px"
          popoutText="Github"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon
            src="/Icons/GithubLogo.png"
            alt="The Github Logo"
            size="52px"
          />
        </LinkBubble>
      </a>
      <a
        href="https://www.linkedin.com/in/phillip-maier-3a4161102/"
        tabIndex={-1}
      >
        <LinkBubble
          top="50%"
          left="-50px"
          diameter="50px"
          popoutText="Linkedin"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon
            src="/Icons/LinkedinLogo.png"
            alt="The Linkedin Logo Logo"
            size="30px"
          />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          top="70.5%"
          left="-30px"
          diameter="50px"
          popoutText="Twitter"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon
            src="/Icons/TwitterLogo.png"
            alt="The Twitter Logo"
            size="25px"
          />
        </LinkBubble>
      </a>

      <LinkBubble
        top="87%"
        left="10px"
        diameter="50px"
        popoutText="Email"
        popoutTransform="translate(-65px, 0)"
        onClick={copyToClip}
      >
        <StyledIcon
          src="/Icons/email.png"
          alt="An Icon of a letter"
          size="38px"
        />
      </LinkBubble>
      <LinkBubble2
        top="78%"
        left="220px"
        diameter="50px"
        popoutText="Boston (for now)"
        popoutTransform="translate(100px, 0)"
        color={theme.colors.brown}
      >
        <StyledIcon
          src="/Icons/RSWorld.png"
          alt="A small pixelated world Icon"
          size="60px"
        />
      </LinkBubble2>
    </StyledContainer>
  )
}
