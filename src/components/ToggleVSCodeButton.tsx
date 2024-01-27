import React from "react"

export const ToggleVSCodeButton = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isButtonGreen, setIsButtonGreenState] = React.useState(false)

  const toggleButton = () => {
    setIsButtonGreenState((currentState) => !currentState)
  }

  return (
    <button
      onClick={toggleButton}
      className={`${isButtonGreen ? "bg-[#14825d]" : "bg-[#047cd4]"}`}
    >
      {children}
    </button>
  )
}
