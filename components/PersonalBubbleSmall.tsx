import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"
import { StyledIcon } from "./sharedStyles"

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
        src="/PictureOfSelf.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
      />
      <a href="https://github.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          diameter="30px"
          top="49px"
          left="-20px"
          popoutText="Github"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon src="/Icons/GithubLogo.png" size="30px" />
        </LinkBubble>
      </a>
      <a
        href="https://www.linkedin.com/in/phillip-maier-3a4161102/"
        tabIndex={-1}
      >
        <LinkBubble
          diameter="30px"
          top="90px"
          left="-17px"
          popoutText="Linkedin"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon src="/Icons/LinkedinLogo.png" size="20px" />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          diameter="30px"
          top="127px"
          left="0px"
          popoutText="Twitter"
          popoutTransform="translate(-65px, 0)"
        >
          <StyledIcon src="/Icons/TwitterLogo.png" size="17px" />
        </LinkBubble>
      </a>
      <LinkBubble
        diameter="30px"
        top="154px"
        left="31px"
        onClick={copyToClip}
        popoutText="Email Me"
        popoutTransform="translate(-65px, 0)"
      >
        <StyledIcon src="/Icons/email.png" size="24px" />
      </LinkBubble>
      <LinkBubble2
        diameter="30px"
        top="130px"
        left="125px"
        popoutText={"Boston \n (for now)"}
        popoutTransform="translate(-10px, 45px)"
        color={theme.colors.brown}
      >
        <StyledIcon src="/Icons/RSWorld.png" size="38px" />
      </LinkBubble2>
    </StyledContainer>
  )
}
