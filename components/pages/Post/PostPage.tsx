import React from "react"
import styled from "styled-components"
import SyntaxHighlighter from "react-syntax-highlighter"
import ReactMarkdown from "react-markdown/with-html"
import style from "../../../theme/codeBlock"

import { ScrollNavPage } from "../ScrollNavPage"
import { Post } from "./post-typings"

const StyledContainer = styled.div`
  padding: 40px;
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

export const PostPage: React.FC<{ content: string; frontMatter: Post }> = ({
  content,
}) => {
  return (
    <ScrollNavPage>
      <StyledContainer>
        <StyledArticleContainer>
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
