import { useEffect } from "react"
import ReactGA from "react-ga"

export const initGA = (): void => {
  ReactGA.initialize("G-2GYRHDGQ02")
}

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const GoogleAnalyticsWrapper: React.FC = ({ children }) => {
  useEffect(() => {
    initGA()
    logPageView()
  }, [])
  return <>{children}</>
}
