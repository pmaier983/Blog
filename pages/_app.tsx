import { ThemeWrapper } from "../theme/ThemeWrapper"
import AlertProvider from "../components/contexts/AlertProvider"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const MyApp = ({ Component, pageProps }) => (
  <AlertProvider>
    <ThemeWrapper>
      <Component {...pageProps} />
    </ThemeWrapper>
  </AlertProvider>
)

export default MyApp
