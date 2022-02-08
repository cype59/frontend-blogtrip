import styled from "styled-components"
import CategoryBanner from "../components/categoryBanner"
import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import baptCyrilv1 from "../images/baptCyrilv1.jpg"
import baptCyrilv0 from "../images/baptCyrilv0.jpg"

type HeaderCategoryProps = {
  bgColor: string
  category: string
  title: string
}

const HeaderCategory = ({ bgColor, category, title }: HeaderCategoryProps) => {
  return (
    <Header bgColor={bgColor}>
      <BannerImage>
        <CategoryBanner category={category} />
        <CategoryTitle>{title}</CategoryTitle>
      </BannerImage>
    </Header>
  )
}

interface IHeaderProps {
  bgColor: string
}

const Header = styled.div<IHeaderProps>`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: ${(props) => props.bgColor};
`

const BannerImage = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-left: -10%;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
  }
`

const CategoryTitle = styled.div`
  color: white;
  position: relative;
  font-size: 9vw;
  font-weight: 800;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 768px) {
    font-size: 11vw;
    margin-top: 0;
    margin-bottom: 0;
  }
`
export default HeaderCategory
