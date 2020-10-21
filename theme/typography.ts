import { RSA_PSS_SALTLEN_AUTO } from "constants"
import Typography from "typography"
import githubTheme from "typography-theme-github"

// delete GithubTheme.googleFonts

githubTheme.overrideThemeStyles = () => ({
  li: {
    margin: 0,
  },
  img: {
    margin: 0,
  },
})

const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
