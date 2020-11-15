import Document, { Html, Head, Main, NextScript } from "next/document"
import { TypographyStyle, GoogleFont } from "react-typography"
import typography from "../theme/typography"

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/PMFavicon.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
            rel="stylesheet"
          />
          <TypographyStyle typography={typography} key />
          <GoogleFont typography={typography} />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
