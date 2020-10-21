import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: text;
  outline: none;
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px black;
    border-radius: 3px;
  }
  :hover {
    outline: 0;
    box-shadow: 0 0 0 2px black;
    border-radius: 3px;
  }
`

export interface StyledNavListProps {
  isCurrentRoute: boolean
}

interface NavListLinkProps {
  href: string
  NavListComponent: React.FC<StyledNavListProps>
}

/*
  Creates a Link component that is disabled if it is the current route 
*/
export const NavListLink: React.FC<NavListLinkProps> = ({
  href,
  NavListComponent,
  children,
}) => {
  const { pathname } = useRouter()
  const isCurrentRoute = href === pathname
  return (
    <>
      {isCurrentRoute ? (
        <NavListComponent isCurrentRoute={isCurrentRoute}>
          {children}
        </NavListComponent>
      ) : (
        <Link href={href}>
          <StyledLink href={href}>
            <NavListComponent isCurrentRoute={isCurrentRoute}>
              {children}
            </NavListComponent>
          </StyledLink>
        </Link>
      )}
    </>
  )
}
