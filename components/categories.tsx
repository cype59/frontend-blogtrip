import Link from "next/link"
import React, { useState } from "react"
import styled from "styled-components"
import px2vw from "../utils/px2vw"
import Card from "./card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { AnimatePresence, motion } from "framer-motion"

const Categories = ({ categories }) => {
  var ghostCol = []
  for (var i = 0; i < 4 - categories.length; i++) {
    ghostCol.push(<Col key={i}></Col>)
  }

  return (
    <Container>
      <Grid>
        {categories.map((article, i) => {
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
`

const RowTitle = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  font-family: "Arial Rounded MT Bold", sans-serif;
`

const RowLink = styled.p`
  font-family: "Arial Rounded MT Bold", sans-serif;
  color: #494949;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 0.5rem;
  padding-top: 6px;
  cursor: pointer;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* gap: ${px2vw(20)}; */
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

export default Categories
