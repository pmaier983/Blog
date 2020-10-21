import React, { useContext } from "react"
import Link from "next/link"
import styled, { ThemeContext } from "styled-components"

import { LinkBox } from "../components/LinkBox"

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

export const GitLinkBoxes: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <StyledLinkBoxContainer>
      <StyledLinkBoxRow>
        <LinkBox size={boxSize} color={theme.colors.gitCommit1} />
        <StyledColumnPadding size={boxPadding} />
        <Link href="/Blog" passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit4}>
              Blog
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size={boxPadding} />
        <LinkBox size={boxSize} color={theme.colors.gitCommit0} />
        <StyledColumnPadding size={boxPadding} />
        <Link href="/About" passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit2}>
              About Me
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
        <Link href="/Projects" passHref>
          <StyledLink>
            <LinkBox size={boxSize} color={theme.colors.gitCommit3}>
              Projects
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size={boxPadding} />
        <LinkBox size={boxSize} color={theme.colors.gitCommit0} />
      </StyledLinkBoxRow>
    </StyledLinkBoxContainer>
  )
}
