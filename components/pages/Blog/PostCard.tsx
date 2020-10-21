import React from "react"
import Link from "next/link"
import styled from "styled-components"

import { StyledLine } from "../../StyledLine"
import { PostOutline } from "../Post/post-typings"

const cardWidth = "285px"
const cardHeight = "250px"

const StyledATag = styled.a`
  color: black;
  text-decoration: none;
  width: ${cardWidth};
  height: ${cardHeight};
  margin: 3%;
  :focus {
    outline: 0;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    border-radius: 3px;
  }
  :hover {
    outline: 0;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    border-radius: 3px;
  }
`

const StyledImage = styled.img`
  position: absolute;
  width: ${cardWidth};
  height: ${cardHeight};
  border-radius: 5px;
`

const StyledImageOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${cardWidth};
  height: ${cardHeight};
`

const StyledTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledTitle = styled.h3`
  background-color: white;
  text-align: center;
  min-width: 180px;
  border-radius: 5px;
  padding: 5px;
`

const StyledSummaryContainer = styled.p`
  background-color: white;
  white-space: pre;
  border-radius: 5px;
  padding: 5px;
  margin: 0;
`

export const PostCard: React.FC<PostOutline> = ({
  slug,
  frontMatter: { bannerDescription, bannerPath, title, description },
}) => {
  return (
    <Link href={`Post/${slug}`}>
      <StyledATag href={`Post/${slug}`}>
        <StyledImage src={bannerPath} alt={bannerDescription} />
        <StyledImageOverlay>
          <StyledTextContainer>
            <StyledLine randomInterruption />
            <StyledTitle>{title}</StyledTitle>
            <StyledLine randomInterruption />
          </StyledTextContainer>
          <StyledTextContainer>
            <StyledLine positioning="top" />
            <StyledSummaryContainer>{description}</StyledSummaryContainer>
            <StyledLine positioning="bottom" />
          </StyledTextContainer>
        </StyledImageOverlay>
      </StyledATag>
    </Link>
  )
}
