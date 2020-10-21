import React from "react"
import _ from "lodash/fp"
import styled, { css } from "styled-components"

const ICON_THEMES = {
  FILLED: "",
  OUTLINED: "-outlined",
  ROUNDED: "-round",
  TWOTONE: "-two-tone",
  SHARP: "-sharp",
}

interface StyledIconProps {
  size?: string
  zIndex?: number
  visible?: boolean
}

const StyledIcon = styled.i<StyledIconProps>`
  ${({ size, zIndex, visible = true }) => css`
    font-size: ${size} !important;
    z-index: ${zIndex};
    visibility: ${visible ? "visible" : "hidden"};
  `}
`

interface MaterialIconProps extends StyledIconProps {
  name: string
}

/*
MaterialIcon auto-completes the correct icon
It may not be 100% necessary, tbd
*/
export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  ...rest
}) => {
  const materialTheme = _.get(
    _.flow(_.split("_"), _.last, _.toUpper)(name),
    ICON_THEMES
  )
  return (
    <StyledIcon
      {...rest}
      className={
        materialTheme ? `material-icons${materialTheme}` : "material-icons"
      }
    >
      {name}
    </StyledIcon>
  )
}
