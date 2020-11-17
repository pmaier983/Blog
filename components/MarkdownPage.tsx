import React from "react"
import styled from "styled-components"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import ReactMarkdown from "react-markdown/with-html"
import { TypographyStyle } from "react-typography"

import style from "../theme/codeBlock"
import { ScrollNavPage } from "./pages/ScrollNavPage"
import typography from "../theme/typography"

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

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={style}>
      {value}
    </SyntaxHighlighter>
  )
}

export const MarkdownPage: React.FC<{ content: string }> = ({ content }) => {
  // on page load, highlight everything
  return (
    <ScrollNavPage>
      <StyledContainer>
        <StyledArticleContainer>
          <TypographyStyle typography={typography} />
          <article>
            <ReactMarkdown
              allowDangerousHtml={false}
              renderers={{ code: CodeBlock }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </StyledArticleContainer>
      </StyledContainer>
    </ScrollNavPage>
  )
}
