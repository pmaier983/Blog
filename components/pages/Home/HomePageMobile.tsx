import React, { useContext } from "react"
import Image from "next/image"
import styled, { ThemeContext } from "styled-components"

import { NavigationButton } from "../../NavigationButton"
import { PersonalBubbleMobile } from "../../PersonalBubbleMobile"
import { LinkBubbleBottom } from "../../LinkBubbleBottom"
import { LinkBox } from "../../LinkBox"

import {
  StyledPageContainer,
  StyledColumnPadding,
  StyledRowPadding,
} from "../../sharedStyles"
import { Link } from "../../Link"
import { paths } from "../../../paths"

const StyledContainer = styled(StyledPageContainer)`
  display: flex;
  flex-direction: column;
`

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 40%;
`

const StyledIntroduction = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  font-size: 15px;
`

const StyledGitBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

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

const StyledATag = styled.a`
  color: black;
  text-decoration: none;
`

export const HomePageMobile: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <StyledContainer>
      <NavigationButton />
      <StyledProfileContainer>
        <PersonalBubbleMobile />
      </StyledProfileContainer>
      <StyledIntroduction>
        Hi
        <span role="img" aria-label="hand waving">
          &nbsp;👋&nbsp;&nbsp;
        </span>
        I&apos;m Phillip, I&apos;m a full-stack
        <span
          role="img"
          aria-label="a stack of books referencing the word Fullstack"
        >
          &nbsp;📚&nbsp;&nbsp;
        </span>
        engineer.
      </StyledIntroduction>
      <StyledGitBoxContainer>
        <Link href={paths.blog.path} passHref>
          <StyledLink>
            <LinkBox color={theme.colors.gitCommit3} size="80px">
              {paths.blog.label}
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size="30px" />
        <Link href={paths.project.path} passHref>
          <StyledLink>
            <LinkBox color={theme.colors.gitCommit2} size="80px">
              {paths.project.label}
            </LinkBox>
          </StyledLink>
        </Link>
        <StyledColumnPadding size="30px" />
        <Link href={paths.about.path} passHref>
          <StyledLink>
            <LinkBox color={theme.colors.gitCommit4} size="80px">
              {paths.about.label}
            </LinkBox>
          </StyledLink>
        </Link>
      </StyledGitBoxContainer>
      <StyledRowPadding size="35px" />
      <StyledLinksContainer>
        <StyledATag href="https://www.linkedin.com/in/phillip-maier-3a4161102/">
          <LinkBubbleBottom diameter="50px" text="Github">
            <Image
              src="/Icons/GithubLogo.png"
              alt="The Github Logo"
              height={52}
              width={52}
            />
          </LinkBubbleBottom>
        </StyledATag>
        <StyledColumnPadding size="20px" />
        <StyledATag href="https://www.linkedin.com/in/phillip-maier-3a4161102/">
          <LinkBubbleBottom diameter="50px" text="Linkedin">
            <Image
              src="/Icons/LinkedinLogo.png"
              alt="The Linkedin Logo Logo"
              height={30}
              width={30}
            />
          </LinkBubbleBottom>
        </StyledATag>
        <StyledColumnPadding size="20px" />
        <StyledATag href="https://twitter.com/pmaier983">
          <LinkBubbleBottom diameter="50px" text="Twitter">
            <Image
              src="/Icons/TwitterLogo.png"
              alt="The Twitter Logo"
              height={30}
              width={30}
            />
          </LinkBubbleBottom>
        </StyledATag>
        <StyledColumnPadding size="20px" />
        <StyledATag href="mailto:pmaier983@gmail.com">
          <LinkBubbleBottom diameter="50px" text="Email">
            <Image
              src="/Icons/email.png"
              alt="An Icon of a letter"
              height={37}
              width={37}
            />
          </LinkBubbleBottom>
        </StyledATag>
      </StyledLinksContainer>
    </StyledContainer>
  )
}
