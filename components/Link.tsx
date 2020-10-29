import React from "react"
import { default as NextLink } from "next/link"
import { LinkProps } from "next/link"

/*
  This is a solution i needed when i was deploying on S3. It was no longer an issue on Vercel
  This Custom Link component was needed because S3 has issues routing
  to the exported next.js html files. 
  This Gist has a better solution to implement when/if needed
  // https://gist.github.com/rbalicki2/30e8ee5fb5bc2018923a06c5ea5e3ea5
*/
export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => (
  <NextLink
    href={
      process.env.NODE_ENV === "production"
        ? href === "/"
          ? "/"
          : `${href}.html`
        : href
    }
    {...rest}
  >
    {children}
  </NextLink>
)
