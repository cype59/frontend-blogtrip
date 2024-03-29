import React from "react"
import Banner from "../components/banner"
import Articles from "../components/articles"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import styled from "styled-components"
import Image from "next/image"

import profilCyrilBapt from "../images/profilCyrilBapt.png"

import bgFooter from "../images/bgFooter.png"
import { motion } from "framer-motion"
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointer } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

const Home = ({ articles, categories, homepage }) => {
  function compareNombres(a, b) {
    return b.published_at > a.published_at
      ? -1
      : b.published_at < a.published_at
      ? 1
      : 0
  }
  const articlesInOrder = articles.slice().sort(compareNombres)
  // const lastArticles = articlesInOrder
  //   .slice(articlesInOrder.length - 4, articlesInOrder.length)
  //   .reverse()

  let MexiqueArticles =
    articlesInOrder &&
    articlesInOrder.filter((article) => article.country?.slug === "mexique")
  MexiqueArticles = MexiqueArticles.slice(
    MexiqueArticles.length - 4,
    MexiqueArticles.length
  ).reverse()

  let conseilsArticles =
    articlesInOrder &&
    articlesInOrder.filter((article) => article.category?.slug === "conseils")

  conseilsArticles = conseilsArticles
    .slice(conseilsArticles.length - 4, conseilsArticles.length)
    .reverse()
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <Banner lastArticle={articlesInOrder[articlesInOrder.length - 1]} />
      {/* <Articles
        articles={lastArticles}
        title="Derniers articles"
        category="destinations"
        query=""
      /> */}
      <Articles
        articles={conseilsArticles}
        title="Conseils et Astuces"
        category="conseils"
        query=""
      />
      <Articles
        articles={MexiqueArticles}
        title="Mexique"
        category="destinations"
        query="mexique"
      />
      <AproposContainer>
        <Link as={`/a-propos`} href={`/a-propos`} passHref>
          <AProposCard
            whileTap={{
              scale: 1,
              transition: {
                type: "speen",
              },
            }}
            whileHover={{
              scale: 1.05,
              transition: {
                type: "speen",
              },
            }}
          >
            <StyledImage>
              <Image src={profilCyrilBapt} alt="baptiste et Moi (Cyril)" />
            </StyledImage>
            <RigthContainer>
              <h1>Hello ! Nous c&apos;est Bapt et Cyril</h1>
              <p>
                On est meilleurs potes depuis l&apos;enfance et on a décidé de
                partir ensemble en tour du monde pendant 1 an. Sur ce blog on y
                racontera nos récits et périples d’aventure.
              </p>
              <p className="p_mobile">
                <FontAwesomeIcon
                  icon={faHandPointer as IconProp}
                  style={{ marginRight: "0.5rem" }}
                />
                Clic pour connaitre notre histoire
              </p>
            </RigthContainer>
          </AProposCard>
        </Link>
        <ImageFooter></ImageFooter>
      </AproposContainer>
    </Layout>
  )
}

const AproposContainer = styled.div`
  margin-top: 7%;

  @media (max-width: 768px) {
    margin-top: 10%;
  }
`

const AProposCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  margin-left: 20%;
  margin-bottom: -10vw;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    margin-bottom: -5vw;
  }
`

const StyledImage = styled.div`
  width: 20vw;
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 768px) {
    width: 30vw;
    margin: auto;
  }
`

const RigthContainer = styled.div`
  margin-left: 5%;
  width: 60%;
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 768px) {
    margin: auto;
    width: 80%;
  }

  h1 {
    font-family: "Roboto", "Open Sans", sans-serif;
    font-size: 2.5vw;

    @media (max-width: 768px) {
      font-size: 4.5vw;
      text-align: center;
    }

    span {
      font-size: 1.2vw;

      @media (max-width: 768px) {
        font-size: 2.5vw;
      }
    }
  }
  .p_mobile,
  p {
    font-family: "Roboto", "Open Sans", sans-serif;
    color: #707070;
    font-size: 1.6vw;
    text-align: justify;
    margin-top: -5px;

    @media (max-width: 768px) {
      font-size: 3.3vw;
    }
  }

  .p_mobile {
    display: none;
    @media (max-width: 768px) {
      display: block;
      text-align: center;
    }
  }
`

const ImageFooter = styled.div`
  width: 100vw;
  height: 30vw;
  background-image: url(${bgFooter.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
`

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ])

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  }
}

export default Home
