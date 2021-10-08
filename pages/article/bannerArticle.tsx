import React from "react"
import styled from "styled-components"
import MyImage from "../../components/image"

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
  font-size: 7vw;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-top: 25vh;
  transform: translateY(-50%);
  margin-left: 5%;
  width: 90%;
`

export default BannerArticle
