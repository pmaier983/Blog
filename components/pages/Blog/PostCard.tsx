import Image from "next/image"
import React from "react"
import styled from "styled-components"
import { paths } from "../../../paths"
import { CategoryCards } from "../../CategoryCards"
import { Link } from "../../Link"

import { StyledLine } from "../../StyledLine"
import { PostOutline } from "./post-typings"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 285;
`

const StyledATag = styled.a`
  color: black;
  text-decoration: none;
  width: 285;
  height: 250;
  border-radius: 3px;
  outline: 0;
  :focus {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
  }
  :hover {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
  }
`

const StyledImageContainer = styled.div`
  position: absolute;
`

const StyledImage = styled(Image)`
  border-radius: 5px;
`

const StyledImageOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 285;
  height: 250;
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

/*
  Is a small Card Summary of a post: containing title and summary both.
  It also has some visual flora in the form of lines and a background picture
*/
export const PostCard: React.FC<PostOutline> = ({
  slug,
  frontMatter: {
    bannerDescription,
    bannerPath,
    title,
    description,
    categories,
  },
}) => {
  return (
    <StyledContainer>
      <Link href={`${paths.blog.path}/${slug}`}>
        <StyledATag tabIndex={0} href={`${paths.blog.path}/${slug}`}>
          <StyledImageContainer>
            <StyledImage
              src={bannerPath}
              alt={bannerDescription}
              height={250}
              width={285}
            />
          </StyledImageContainer>
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
      <CategoryCards cards={categories} />
    </StyledContainer>
  )
}
