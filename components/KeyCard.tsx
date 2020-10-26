import React from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
  padding: 0 5px;
  border: 2px solid ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.brown};
  border-radius: 5px;
  margin: 3px;
`

export const KeyCard: React.FC = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)
