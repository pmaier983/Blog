import React, { createContext, useReducer, useContext } from "react"

interface StateObject {
  visible: boolean
  text?: React.ReactNode | string
}

const initialState: StateObject = {
  visible: false,
}

interface Action {
  type: string
  payload?: React.ReactNode | string
}

export const ALERT_ACTIONS = {
  SHOW_ALERT: "SHOW_ALERT",
  HIDE_ALERT: "HIDE_ALERT",
}

type ContextProps = [StateObject, React.Dispatch<Action>]

export const AlertContext = createContext<ContextProps>([
  initialState,
  () => console.error("Place a Provider In A Parent Node to allow alerts"),
])

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAlertContext = () => useContext(AlertContext)

const reducer = (state: StateObject, action: Action) => {
  switch (action.type) {
    case ALERT_ACTIONS.SHOW_ALERT:
      return { visible: true, text: action.payload }
    case ALERT_ACTIONS.HIDE_ALERT:
      return { ...state, visible: false }
    default:
      console.error("The Reducer Doesn't handle this type")
      return state
  }
}

const AlertProvider: React.FC = ({ children }) => {
  const reducedState = useReducer(reducer, initialState)
  return (
    <AlertContext.Provider value={reducedState}>
      {children}
    </AlertContext.Provider>
  )
}
export default AlertProvider
