import React from "react"
import styled from "styled-components"
import MyImage from "./image"

const BannerArticle = ({ image, title }) => {
  return (
    <Header>
      <BannerImage>
        <MyImage image={image} fullRatio={true} />
        <ArticleTitle>{title}</ArticleTitle>
      </BannerImage>
    </Header>
  )
}

const Header = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`

const BannerImage = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
`

const ArticleTitle = styled.div`
  color: white;
  position: absolute;
  text-align: center;
  font-size: 9vw;
  font-weight: 800;
  font-family: "Bebas Neue", "Open Sans", sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  margin-top: 25vh;
  transform: translateY(-50%);
  margin-left: 5%;
  width: 90%;

  @media (max-width: 1024px) {
    font-size: 10vw;
  }

  @media (max-width: 768px) {
    font-size: 11vw;
  }
`

export default BannerArticle
