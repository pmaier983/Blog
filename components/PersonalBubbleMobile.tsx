import React from "react"
import styled from "styled-components"

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

const StyledRSIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 55px;
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
        alt="Picture of Phillip Maier standing with a background of green hills"
      />
      <StyledRSIcon
        src="/Icons/RSWorld.png"
        alt="A small pixelated world Icon"
      />
      <StyledIconBackground />
      <StyledText>
        Boston <br />
        (for now)
      </StyledText>
    </StyledContainer>
  )
}
