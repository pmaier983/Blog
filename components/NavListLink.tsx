import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: text;
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
