import React from "react"
import Image from "next/image"
import styled from "styled-components"
import { ImageWithPlaceholder } from "./ImageWithPlaceholder"

const StyledContainer = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
`

const StyledProfilePicture = styled(ImageWithPlaceholder)`
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
`

const StyledIconBackground = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.brown};
  border: 4px solid ${({ theme }) => theme.colors.lightBrown};
  border-radius: 50%;
  bottom: 0;
  right: 0;
  width: 55px;
  height: 55px;
`

const StyledIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

const StyledIcon = styled(Image)`
  z-index: 1;
`

const StyledText = styled.span`
  position: absolute;
  text-align: center;
  font-size: 13px;
  bottom: 5px;
  right: -60px;
`

/* 
  A Simple Personal Bubble with just my photo
  Unable to use Link Bubble Component as it looks odd on mobile
*/
export const PersonalBubbleMobile: React.FC = () => {
  return (
    <StyledContainer>
      <StyledProfilePicture
        src="/PictureOfSelf.png"
        placeholder="/PictureOfSelf-Placeholder.png"
        alt="Picture of Phillip Maier standing with a background of green hills"
        height={200}
        width={200}
        priority
      />
      <StyledIconContainer>
        <StyledIcon
          src="/Icons/RSWorld.png"
          alt="A small pixelated world Icon"
          height={55}
          width={55}
        />
      </StyledIconContainer>
      <StyledIconBackground />
      <StyledText>
        Boston <br />
        (for now)
      </StyledText>
    </StyledContainer>
  )
}
