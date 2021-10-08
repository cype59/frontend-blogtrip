import Articles from "../../components/articles"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"
import React from "react"
import MyImage from "../../components/image"

const Continent = ({ continent, continents }) => {
  const seo = {
    metaTitle: continent.name,
    metaDescription: `All ${continent.name} articles`,
  }

  return (
    <Layout categories={continent}>
      <Seo seo={seo} />
      <Header>
        <BannerImage>
          <MyImage image={continent.image} fullRatio={true} />
          <ArticleTitle>{continent.name}</ArticleTitle>
        </BannerImage>
      </Header>
      <Articles
        articles={continent.articles}
        title={continent.name}
        category="destinations"
      />
    </Layout>
  )
}

export async function getStaticPaths() {
  const continents = await fetchAPI("/continents")

  return {
    paths: continents.map((continent) => ({
      params: {
        continentslug: continent.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const continent = (
    await fetchAPI(`/continents?slug=${params.continentslug}`)
  )[0]
  const continents = await fetchAPI("/continents")

  return {
    props: { continent, continents },
    revalidate: 1,
  }
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

export default Continent
