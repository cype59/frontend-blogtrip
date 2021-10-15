import Link from "next/link"
import React, { useState } from "react"
import styled from "styled-components"
import px2vw from "../utils/px2vw"
import Card from "./card"
import { AnimatePresence, motion } from "framer-motion"

interface IHref {
  pathname: string
  query?: {
    continent: string
  }
}

const Articles = ({ articles, title, category, query }) => {
  const [isHover, setIsHover] = useState(false)

  var ghostCol = []
  for (var i = 0; i < 4 - articles.length; i++) {
    ghostCol.push(<Col key={i}></Col>)
  }

  let href: IHref = { pathname: "" }

  if (query !== "") {
    href = {
      pathname: category,
      query: {
        continent: query,
      },
    }
  } else {
    href = {
      pathname: category,
    }
  }

  return (
    <Container>
      <motion.div
        onHoverStart={() => {
          setIsHover(true)
        }}
        onHoverEnd={() => {
          setIsHover(false)
        }}
      >
        <RowTitle>
          <Title>{title}</Title>
          {}
          <Link href={href} passHref>
            <RowLinkMobile>Voir tout</RowLinkMobile>
          </Link>
          <AnimatePresence>
            {isHover && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "tween",
                    duration: 0.7,
                    ease: "circOut",
                  },
                }}
                exit={{ opacity: 0 }}
              >
                <Link href={href} passHref>
                  <RowLink>Voir tout</RowLink>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </RowTitle>
      </motion.div>
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
        {ghostCol}
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

const RowTitle = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  font-size: 2rem;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;
`

const RowLinkStyle = `
font-family: "Arial Rounded MT Bold", sans-serif;
color: #494949;
font-size: 1rem;
font-weight: 500;
margin-left: 0.5rem;
padding-top: 6px;
cursor: pointer;
`

const RowLink = styled.p`
  ${RowLinkStyle}
  @media (max-width: 880px) {
    display: none;
  }
`

const RowLinkMobile = styled.p`
  ${RowLinkStyle}
  display:none;
  @media (max-width: 880px) {
    display: flex;
  }
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
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
    width: ${px2vw(500)};
    height: 100%;
  }
`

export default Articles
