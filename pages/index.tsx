import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { NextSeo } from "next-seo"

import { HomePageDesktop, HomePageMobile } from "../components/pages/Home"
import { useMediaQuery } from "../components/hooks"

/*
  This File is more of a landing page "placeholder". It contains the head
  and the logic to switch between my custom Mobile and Desktop landing page
*/
const HomePage: React.FC = () => {
  const theme = useContext(ThemeContext)
  const shouldUseMobile = useMediaQuery(theme.breakpoints.mobile)
  return (
    <>
      <NextSeo
        title="Phillip Maier"
        description="Hi, I'm Phillip. I'm a fullstack engineer who loves Open Source and helping others!"
      />
      {shouldUseMobile ? <HomePageMobile /> : <HomePageDesktop />}
    </>
  )
}

export default HomePage
