import React from "react"
import { default as NextLink } from "next/link"
import { LinkProps } from "next/link"

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => (
  <NextLink
    href={process.env.NODE_ENV === "production" ? `${href}.html` : href}
    {...rest}
  >
    {children}
  </NextLink>
)
