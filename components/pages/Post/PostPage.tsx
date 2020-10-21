import React from "react"
import styled from "styled-components"
import ReactMarkdown from "react-markdown/with-html"

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

export const PostPage: React.FC<{ content: string; frontMatter: Post }> = ({
  content,
}) => {
  return (
    <ScrollNavPage>
      <StyledContainer>
        <StyledArticleContainer>
          <article>
            <ReactMarkdown allowDangerousHtml={false}>{content}</ReactMarkdown>
          </article>
        </StyledArticleContainer>
      </StyledContainer>
    </ScrollNavPage>
  )
}
