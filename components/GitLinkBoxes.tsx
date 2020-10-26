import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { LinkBox } from "../components/LinkBox"
import { paths } from "../paths"
import { Link } from "./Link"

const StyledLinkBoxContainer = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
`

const StyledLinkBoxRow = styled.div`
  display: flex;
  flex-direction: row;
`

// TODO: add cool hover animation
const StyledLink = styled.a`
  text-align: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :focus {
    text-decoration: underline;
  }
`

interface StyledPaddingProps {
  size: string
}

const StyledRowPadding = styled.div<StyledPaddingProps>`
  height: ${({ size }) => size};
`

const StyledColumnPadding = styled.div<StyledPaddingProps>`
  width: ${({ size }) => size};
`

const boxPadding = "20px"
const boxSize = "80px"

/*
  A series of boxes that either disappear on hover or contain a link to 
  somewhere in the site
  Built to resemble git commit history
*/
export const GitLinkBoxes: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <StyledLinkBoxContainer>
      <StyledLinkBoxRow>
        <LinkBox size={boxSize} color={theme.colors.gitCommit1} />
        <StyledColumnPadding size={boxPadding} />
        <Link href={paths.blog.path} passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit4}>
              {paths.blog.label}
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size={boxPadding} />
        <LinkBox size={boxSize} color={theme.colors.gitCommit0} />
        <StyledColumnPadding size={boxPadding} />
        <Link href={paths.about.path} passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit2}>
              {paths.about.label}
            </LinkBox>
          </StyledLink>
        </Link>
      </StyledLinkBoxRow>
      <StyledRowPadding size={boxPadding} />
      <StyledLinkBoxRow>
        <LinkBox size={boxSize} color={theme.colors.gitCommit1} />
        <StyledColumnPadding size={boxPadding} />
        <LinkBox size={boxSize} color={theme.colors.gitCommit1} />
        <StyledColumnPadding size={boxPadding} />
        <Link href={paths.projects.path} passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit3}>
              {paths.projects.path}
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size={boxPadding} />
        <LinkBox size={boxSize} color={theme.colors.gitCommit0} />
      </StyledLinkBoxRow>
    </StyledLinkBoxContainer>
  )
}
