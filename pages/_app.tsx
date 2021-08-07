import Head from "next/head"

import { ThemeWrapper } from "@/theme/ThemeWrapper"
import { GlobalStyle } from "@/components/utils/globalStyles"

const MyApp = ({ Component, pageProps }: any) => (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
    </Head>
    <GlobalStyle />
    <ThemeWrapper>
      <Component {...pageProps} />
    </ThemeWrapper>
  </>
)

export default MyApp
