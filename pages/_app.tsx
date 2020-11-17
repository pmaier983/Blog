import Head from "next/head"

import { ThemeWrapper } from "../theme/ThemeWrapper"
import AlertProvider from "../components/contexts/AlertProvider"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <AlertProvider>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </AlertProvider>
  </>
)

export default MyApp
