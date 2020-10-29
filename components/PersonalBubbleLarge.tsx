import React, { useContext } from "react"
import Image from "next/image"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"

import { copyToClipboard } from "./utils/utils"

const StyledContainer = styled.div`
  position: absolute;
  height: 275px;
  width: 275px;
`

const StyledProfilePicture = styled(Image)`
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
        height={275}
        width={275}
      />
      <a href="https://github.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          top="28%"
          left="-47px"
          diameter="50px"
          popoutText="Github"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/GithubLogo.png"
            alt="The Github Logo"
            height={52}
            width={52}
          />
        </LinkBubble>
      </a>
      <a
        href="https://www.linkedin.com/in/phillip-maier-3a4161102/"
        tabIndex={-1}
      >
        <LinkBubble
          top="138px"
          left="-43px"
          diameter="50px"
          popoutText="Linkedin"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/LinkedinIcon.png"
            alt="The Linkedin Logo Logo"
            height={30}
            width={30}
          />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          top="70.5%"
          left="-20px"
          diameter="50px"
          popoutText="Twitter"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/TwitterLogo.png"
            alt="The Twitter Logo"
            height={25}
            width={25}
          />
        </LinkBubble>
      </a>

      <LinkBubble
        top="87%"
        left="20px"
        diameter="50px"
        popoutText="Email"
        popoutTransform="translate(-65px, 0)"
        onClick={copyToClip}
      >
        <Image
          src="/Icons/email.png"
          alt="An Icon of a letter"
          height={38}
          width={38}
        />
      </LinkBubble>
      <LinkBubble2
        top="78%"
        right="10px"
        diameter="50px"
        popoutText="Boston (for now)"
        popoutTransform="translate(100px, 0)"
        color={theme.colors.brown}
      >
        <Image
          src="/Icons/RSWorld.png"
          alt="A small pixelated world Icon"
          height={60}
          width={60}
        />
      </LinkBubble2>
    </StyledContainer>
  )
}
