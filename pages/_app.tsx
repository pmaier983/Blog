import Head from "next/head"

import { ThemeWrapper } from "../theme/ThemeWrapper"
import AlertProvider from "../components/contexts/AlertProvider"
import { GoogleAnalyticsWrapper } from "../components/utils/googleAnalytics"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      ></link>
    </Head>
    <GoogleAnalyticsWrapper>
      <AlertProvider>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </AlertProvider>
    </GoogleAnalyticsWrapper>
  </>
)

export default MyApp
