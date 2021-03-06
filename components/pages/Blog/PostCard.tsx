import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { paths } from "../../../paths"
import { CategoryCards } from "../../CategoryCards"

import { PostOutline } from "./post-typings"
import { Line } from "../../Line"
import { StyledRowPadding } from "../../sharedStyles"
import { ImageWithPlaceholder } from "../../ImageWithPlaceholder"

const borderRadius = 4
const cardHeight = 250
const cardWidth = 280

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const StyledCardContainer = styled.div`
  height: ${cardHeight + "px"};
  width: ${cardWidth + "px"};
  box-shadow: 0 0 0 1px white;
  border-radius: ${borderRadius + "px"};
  z-index: 2;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gitCommit0};
  background-color: white;
`

const StyledATag = styled.a`
  width: ${cardWidth + "px"};
  color: black;
  border-radius: ${borderRadius + "px"};
  :hover {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    outline: none;
  }
  :focus {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    outline: none;
  }
`

const StyledBackgroundImage = styled(ImageWithPlaceholder)`
  border-radius: ${borderRadius + "px"};
  position: absolute;
`

const StyledCardContent = styled.div`
  position: absolute;
  height: ${cardHeight + "px"};
  width: ${cardWidth + "px"};
  z-index: 1;
`

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledTitle = styled.h3`
  background-color: white;
  margin: 0;
  padding: 7px;
  border-radius: ${borderRadius + "px"};
  max-width: ${cardWidth * 0.8 + "px"};
  ${StyledATag}:hover & {
    color: white;
    background: linear-gradient(
      30deg,
      ${({ theme }) => theme.colors.gitCommit3},
      ${({ theme }) => theme.colors.gitCommit2}
    );
  }
  ${StyledATag}:focus & {
    color: white;
    background: linear-gradient(
      30deg,
      ${({ theme }) => theme.colors.gitCommit3},
      ${({ theme }) => theme.colors.gitCommit2}
    );
  }
`

const StyledDescription = styled.p`
  background-color: white;
  margin: 0;
  padding: 7px;
  font-size: 15px;
  border-radius: ${borderRadius + "px"};
  max-width: ${cardWidth * 0.9 + "px"};
`

/*
  The Post card is a simple summary card for any post.
  Key components are description and the background image that is progressively loaded in
*/
export const PostCard: React.FC<PostOutline> = ({
  slug,
  frontMatter: {
    bannerDescription,
    bannerPath,
    bannerPlaceholderPath,
    title,
    description,
    tags,
  },
}) => {
  return (
    <StyledContainer>
      <Link href={`${paths.blog.path}/${slug}`} passHref>
        <StyledATag>
          <StyledCardContainer>
            <StyledCardContent>
              <StyledRowPadding size="20px" />
              <StyledTextContainer>
                <Line />
                <StyledTitle>{title}</StyledTitle>
                <Line />
              </StyledTextContainer>
              <StyledRowPadding size="20px" />
              <StyledTextContainer>
                <Line bottom />
                <StyledDescription>{description}</StyledDescription>
                <Line top />
              </StyledTextContainer>
            </StyledCardContent>
            <StyledBackgroundImage
              src={bannerPath}
              placeholder={bannerPlaceholderPath}
              alt={bannerDescription}
              height={cardHeight}
              width={cardWidth}
            />
          </StyledCardContainer>
        </StyledATag>
      </Link>
      <CategoryCards cards={tags} width={cardWidth + "px"} />
    </StyledContainer>
  )
}
