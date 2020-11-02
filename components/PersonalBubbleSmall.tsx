import React, { useContext } from "react"
import Image from "next/image"
import styled, { ThemeContext } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"
import { ClipboardConfirmationAlert } from "./contexts/Alerts"
import { LinkBubble } from "./LinkBubble"
import { LinkBubble2 } from "./LinkBubble2"

import { copyToClipboard } from "./utils/utils"
import { ImageWithPlaceholder } from "./ImageWithPlaceholder"

const StyledContainer = styled.div`
  position: absolute;
  height: 175px; // for some reason next can't handle importing NavBarWidth
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledProfilePicture = styled(ImageWithPlaceholder)`
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
`

/* 
  Nearly identical to the PersonalBubbleLarge, but scaled down in size.
*/
export const PersonalBubbleSmall: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [, dispatchAlert] = useAlertContext()

  const copyToClip = () => {
    copyToClipboard("pmaier983@gmail.com")
    dispatchAlert({
      type: ALERT_ACTIONS.SHOW_ALERT,
      payload: <ClipboardConfirmationAlert />,
    })
  }

  return (
    <StyledContainer>
      <StyledProfilePicture
        src="/PictureOfSelf.png"
        placeholder="/PictureOfSelf-Placeholder.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
        height={160}
        width={160}
      />
      <a href="https://github.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          diameter="30px"
          top="48px"
          left="-29px"
          popoutText="Github"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/GithubLogo.png"
            alt="The Github Logo"
            height={30}
            width={30}
          />
        </LinkBubble>
      </a>

      <a
        href="https://www.linkedin.com/in/phillip-maier-3a4161102/"
        tabIndex={-1}
      >
        <LinkBubble
          diameter="30px"
          top="89px"
          left="-27px"
          popoutText="Linkedin"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/LinkedinIcon.png"
            alt="The Linkedin Logo Logo"
            height={20}
            width={20}
          />
        </LinkBubble>
      </a>
      <a href="https://twitter.com/pmaier983" tabIndex={-1}>
        <LinkBubble
          diameter="30px"
          top="125px"
          left="-9px"
          popoutText="Twitter"
          popoutTransform="translate(-65px, 0)"
        >
          <Image
            src="/Icons/TwitterLogo.png"
            alt="The Twitter Logo"
            height={17}
            width={17}
          />
        </LinkBubble>
      </a>
      <LinkBubble
        diameter="30px"
        top="150px"
        left="22px"
        onClick={copyToClip}
        popoutText="Email Me"
        popoutTransform="translate(-65px, 0)"
      >
        <Image
          src="/Icons/email.png"
          alt="An Icon of a letter"
          height={24}
          width={24}
        />
      </LinkBubble>
      <LinkBubble2
        diameter="30px"
        top="125px"
        left="125px"
        popoutText={"Boston \n (for now)"}
        popoutTransform="translate(-10px, 55px)"
        color={theme.colors.brown}
      >
        <Image
          src="/Icons/RSWorld.png"
          alt="A small pixelated world Icon"
          height={38}
          width={38}
        />
      </LinkBubble2>
    </StyledContainer>
  )
}
