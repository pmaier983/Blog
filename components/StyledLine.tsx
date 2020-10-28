import React from "react"
import styled from "styled-components"
import _ from "lodash/fp"

interface StyledLine {
  size?: string
  positioning?: "top" | "bottom"
}

const StyledLineHorizontal = styled.div<StyledLine>`
  box-shadow: 0 0 0 2px white;
  width: ${({ size = "100%" }) => size};
  height: 0;
  margin-top: ${({ positioning }) => positioning === "top" && "10%"};
  margin-bottom: ${({ positioning }) => positioning === "bottom" && "10%"};
  z-index: 2;
`

const StyledLineVertical = styled.div<StyledLine>`
  border: 2px solid white;
  height: ${({ size = "20%" }) => size};
  border-radius: 25%;
  width: 0;
`

const StyledLineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

interface StyledLineProps extends StyledLine {
  interruption?: boolean
  randomInterruption?: boolean
}

/*
  creates one of three lines:
  1. a normal horizontal line
  2. a horizontal line with an interruption (a vertical line) in the middle 
  3. a horizontal line with a random number of interruptions spaced randomly
*/
export const StyledLine: React.FC<StyledLineProps> = ({
  interruption,
  randomInterruption,
  ...rest
}) => {
  if (interruption) {
    return (
      <StyledLineContainer>
        <StyledLineHorizontal />
        <StyledLineVertical />
        <StyledLineHorizontal />
      </StyledLineContainer>
    )
  }

  if (randomInterruption) {
    const numberOfVerticalLines = _.random(0, 3)
    const verticalLineSize = "20%"

    // TODO: get styledFragment working again
    /*
      const verticalLines = new Array(_.random(0, 3)).map((value, index) => (
        <StyledFragment key={index}>
          <StyledLineHorizontal size="20%" />
          <StyledLineVertical />
        </StyledFragment>
      ))
    */

    return (
      <StyledLineContainer>
        <StyledLineHorizontal />
        {numberOfVerticalLines > 0 && (
          <>
            <StyledLineHorizontal size={verticalLineSize} />
            <StyledLineVertical />
          </>
        )}
        {numberOfVerticalLines > 1 && (
          <>
            <StyledLineHorizontal size={verticalLineSize} />
            <StyledLineVertical />
          </>
        )}
        {numberOfVerticalLines > 2 && (
          <>
            <StyledLineHorizontal size={verticalLineSize} />
            <StyledLineVertical />
          </>
        )}
        <StyledLineHorizontal />
      </StyledLineContainer>
    )
  }
  return <StyledLineHorizontal {...rest} />
}
