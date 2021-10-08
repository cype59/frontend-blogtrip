import Articles from "../components/articles"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import React from "react"
import MyImage from "../components/image"
import Link from "next/link"

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  }

  console.log(category.continents)

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <Header>
        <BannerImage>
          <MyImage image={category.image} fullRatio={true} />
          <ArticleTitle>{category.name}</ArticleTitle>
        </BannerImage>
      </Header>
      {/* <Articles
        articles={category.articles}
        title={category.name}
        category="destinations"
      /> */}
      {category.continents.map((continent, i) => {
        return (
          <Link
            as={`/destinations/${continent.slug}`}
            href={`/destinations/${continent.slug}`}
            key={continent.slug}
            passHref
          >
            {continent.name}
          </Link>
        )
      })}
    </Layout>
  )
}

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories")

  return {
    paths: categories.map((category) => ({
      params: {
        categoryslug: category.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const category = (
    await fetchAPI(`/categories?slug=${params.categoryslug}`)
  )[0]
  const categories = await fetchAPI("/categories")

  return {
    props: { category, categories },
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

export default Category
