import React, { useContext } from "react"
import Head from "next/head"
import { ThemeContext } from "styled-components"

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
      <Head>
        <title>Phillip Maier&apos;s Site</title>
      </Head>
      {shouldUseMobile ? <HomePageMobile /> : <HomePageDesktop />}
    </>
  )
}

export default HomePage
