import React from "react"
import styled from "styled-components"
import MyImage from "./image"
import Moment from "react-moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { motion } from "framer-motion"

const Banner = ({ lastArticle }) => {
  return (
    <Header>
      <BannerImage>
        <MyImage image={lastArticle.image} fullRatio={true} />
        <BannerItem>
          <ArticleTitle>{lastArticle?.title || ""}</ArticleTitle>
          <BannerGrid>
            <Link
              as={`/article/${lastArticle.slug}`}
              href={`/article/${lastArticle.slug}`}
              passHref
            >
              <BannerButton
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ marginRight: "0.5rem" }}
                />
                Lire
              </BannerButton>
            </Link>
            <BannerText>
              <Moment format="DD/MM/YYYY">
                {lastArticle?.published_at || ""}
              </Moment>
              <p>{lastArticle?.author.name || ""}</p>
            </BannerText>
          </BannerGrid>
        </BannerItem>
      </BannerImage>
      <div className="icon-scroll"></div>
    </Header>
  )
}

const Header = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const BannerImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const BannerItem = styled.div`
  position: absolute;
  margin-left: 50px;
  width: 60%;
  margin-top: 50vh;
  transform: translateY(-50%);

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
    text-align: center;
  }
`

const ArticleTitle = styled.h1`
  color: white;
  position: relative;
  font-size: 9vw;
  font-weight: 800;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 9vw;
  }

  @media (max-width: 768px) {
    font-size: 13vw;
  }
`

const BannerGrid = styled.div`
  margin-top: 1rem;
`

const BannerButton = styled(motion.button)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 6px;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #000;
  background-color: #e6e6e6;
  font-size: 2vw;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;

  &:hover {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.4s;
  }

  @media (max-width: 1024px) {
    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    font-size: 6vw;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const BannerText = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: white;
  font-size: 1.8vw;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  font-family: "Roboto", "Open Sans", "Helvetica Neue", sans-serif;

  p {
    margin-top: 0;
    margin-bottom: 0.3em;
  }

  @media (max-width: 1024px) {
    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    font-size: 5vw;
    text-align: left;
    p {
      margin-top: 5px;
    }
  }
`

export default Banner
