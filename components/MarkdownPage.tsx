import React, { useEffect } from "react"
import Prism from "prismjs"
import styled from "styled-components"
import ReactMarkdown from "react-markdown/with-html"

import { ScrollNavPage } from "./pages/ScrollNavPage"

const StyledContainer = styled.div`
  padding: 50px 40px;
  display: flex;
  justify-content: center;
`

const StyledArticleContainer = styled.div`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gitCommit0};
`

export const MarkdownPage: React.FC<{ content: string }> = ({ content }) => {
  // on page load, highlight everything
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll()
    }
  }, [])
  return (
    <ScrollNavPage>
      <StyledContainer>
        <StyledArticleContainer>
          <article>
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </StyledArticleContainer>
      </StyledContainer>
    </ScrollNavPage>
  )
}
