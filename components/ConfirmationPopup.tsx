import React, { useEffect } from "react"
import styled, { css } from "styled-components"

import { useAlertContext, ALERT_ACTIONS } from "./contexts/AlertProvider"

interface StyledContainerProps {
  visible: boolean
}

const AlertBoxContainer = styled.div`
  width: 100%;
  justify-content: center;
  position: fixed;
  display: flex;
  bottom: 20px;
`

const StyledContainer = styled.span<StyledContainerProps>`
  ${({ theme, visible }) => css`
    background-color: ${theme.colors.gitCommit0};
    opacity: ${visible ? 1 : 0};
  `}
  transition: all ease-in 0.5s;
  position: fixed;
  display: flex;
  bottom: 40px;
  padding: 10px;
  border-radius: 5px;
`

/*
  Popup at the bottom of the screen that stays visible for a couple seconds
  currently (10/26/2020) used to alert of an email copied to clipboard
*/
export const ConfirmationPopup: React.FC = () => {
  const [{ text: confirmation, visible }, dispatchAlert] = useAlertContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      visible && dispatchAlert({ type: ALERT_ACTIONS.HIDE_ALERT })
    }, 4000)
    return () => clearTimeout(timer)
  }, [visible, dispatchAlert])

  return (
    <AlertBoxContainer>
      <StyledContainer visible={visible}>{confirmation}</StyledContainer>
    </AlertBoxContainer>
  )
}
