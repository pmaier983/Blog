import React, { useContext } from "react"
import Image from "next/image"
import { default as NextLink } from "next/link"
import styled, { ThemeContext } from "styled-components"
import { paths } from "../../../paths"
import { CategoryCards } from "../../CategoryCards"

import { ProjectOutline } from "./project-typings"
import { Line } from "../../Line"
import { StyledColumnPadding, StyledRowPadding } from "../../sharedStyles"
import { Link } from "../../Link"
import { MaterialIcon } from "../../MaterialIcon"

const borderRadius = 4
const cardHeight = 325
const cardWidth = 285

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${cardHeight + "px"};
  width: ${cardWidth + "px"};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gitCommit0};
  background-color: white;
  border-radius: ${borderRadius + "px"};
  z-index: 2;
`

const StyledATag = styled.a`
  width: ${cardWidth + "px"};
  color: black;
  border-radius: ${borderRadius + "px"};
  :hover {
    text-decoration: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    outline: none;
  }
  :focus {
    text-decoration: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gitCommit2};
    outline: none;
  }
`

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledImage = styled(Image)`
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gitCommit0};
  border-radius: ${borderRadius + "px"};
`

const StyledTitleContainer = styled.div`
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
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gitCommit0};
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

const StyledDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`

const StyledDescription = styled.p`
  align-self: center;
  text-align: center;
  background-color: white;
  margin: 0;
  padding: 7px;
  font-size: 15px;
  border-radius: ${borderRadius + "px"};
  max-width: ${cardWidth * 0.9 + "px"};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gitCommit0};
`

const StyledButton = styled.button`
  all: unset;
  align-self: center;
  align-items: center;
  display: flex;
  color: inherit;
  padding: 3px 10px;
  background-color: ${({ theme }) => theme.colors.gitCommit1};
  border-radius: ${borderRadius + "px"};
  color: black;
  :focus {
    text-decoration: none;
    outline: none;
    color: white;
    background: linear-gradient(
      30deg,
      ${({ theme }) => theme.colors.gitCommit3},
      ${({ theme }) => theme.colors.gitCommit2}
    );
  }
  :hover {
    text-decoration: none;
    outline: none;
    color: white;
    background: linear-gradient(
      30deg,
      ${({ theme }) => theme.colors.gitCommit3},
      ${({ theme }) => theme.colors.gitCommit2}
    );
  }
`

export const ProjectCard: React.FC<ProjectOutline> = ({
  slug,
  frontMatter: {
    bannerDescription,
    bannerPath,
    bannerHeight,
    bannerWidth,
    title,
    description,
    categories,
  },
}) => {
  const theme = useContext(ThemeContext)
  return (
    <StyledContainer>
      <Link href={`${paths.project.path}/${slug}`} passHref>
        <StyledATag>
          <StyledCardContainer>
            <StyledRowPadding size="10px" />
            <StyledTitleContainer>
              <Line color={theme.colors.gitCommit0} />
              <StyledTitle>{title}</StyledTitle>
              <Line color={theme.colors.gitCommit0} />
            </StyledTitleContainer>
            <StyledRowPadding size="10px" />
            <StyledImageContainer>
              <StyledImage
                src={bannerPath}
                alt={bannerDescription}
                width={bannerWidth}
                height={bannerHeight}
              />
            </StyledImageContainer>
            <StyledRowPadding size="10px" />
            <StyledDescriptionContainer>
              <Line color={theme.colors.gitCommit0} bottom />
              <StyledDescription>{description}</StyledDescription>
              <Line color={theme.colors.gitCommit0} top />
            </StyledDescriptionContainer>
            <StyledRowPadding size="5px" />
            <NextLink href="https://phillip-maier.com" passHref>
              <StyledButton tabIndex={0}>
                <MaterialIcon name="web" />
                <StyledColumnPadding size="5px" />
                Visit Site
              </StyledButton>
            </NextLink>
            <StyledRowPadding size="5px" />
          </StyledCardContainer>
        </StyledATag>
      </Link>
      <CategoryCards cards={categories} width={cardWidth + "px"} />
    </StyledContainer>
  )
}
