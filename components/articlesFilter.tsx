import Link from "next/link"
import React from "react"
import styled from "styled-components"
import px2vw from "../utils/px2vw"
import Card from "./card"

const ArticlesFilter = ({ articles }) => {
  return (
    <Container>
      <Grid>
        {articles.map((article, i) => {
          return (
            <Link
              as={`/article/${article.slug}`}
              href={`/article/${article.slug}`}
              key={article.slug}
              passHref
            >
              <Col>
                <Card article={article} />
              </Col>
            </Link>
          )
        })}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`
const Col = styled.div`
  display: flex;
  width: ${px2vw(320, 320)};
  flex-direction: column;
  height: 100%;
  margin-right: ${px2vw(20)};
  margin-top: ${px2vw(20)};

  @media (min-width: 768px) {
    width: ${px2vw(320, 768)};
    height: 100%;
  }
  @media (min-width: 1024px) {
    width: ${px2vw(300)};
    height: 100%;
  }
`

export default ArticlesFilter
