import Head from "next/head"

import { ThemeWrapper } from "../theme/ThemeWrapper"
import AlertProvider from "../components/contexts/AlertProvider"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      ></link>
    </Head>
    <AlertProvider>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </AlertProvider>
  </>
)

export default MyApp
