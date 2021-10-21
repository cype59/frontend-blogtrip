import { DiscussionEmbed } from "disqus-react"
import styled from "styled-components"

const DisqusComments = ({ article }) => {
  const disqusShortname = "followmytripcomment"
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/article/${article.slug}`,
    identifier: article.slug,
    title: article.title,
  }
  return (
    <DisqusContainer>
      <DisqusTitle>Commentaires</DisqusTitle>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </DisqusContainer>
  )
}

export default DisqusComments

const DisqusContainer = styled.div`
  margin: 50px 0;
  padding: 0 10%;
  padding-bottom: 10%;
  background-color: white;
  color: #111111;
  border-radius: 10px;
`

const DisqusTitle = styled.h1`
  color: #111111;
  font-family: "Bebas Neue", "Open Sans", sans-serif;
  text-transform: uppercase;
  font-size: 3vw;
  text-align: center;
  padding: 5%;

  @media (max-width: 1024px) {
    font-size: 6vw;
  }
`
