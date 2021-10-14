import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import CategoryBanner from "../components/categoryBanner"
import { AnimatePresence, motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import ArticlesFilter from "../components/articlesFilter"

interface ContinentColor {
  category: string
  color: string
}

const Category = ({ category, categories, continents }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  }

  const ContinentsColor: ContinentColor[] = [
    {
      category: "asie-du-sud-est",
      color: "#9b5ab4",
    },
    {
      category: "asie-du-sud",
      color: "#e64b3c",
    },
    {
      category: "amerique-du-sud",
      color: "#2dc873",
    },
    {
      category: "amerique-centrale",
      color: "#3296dc",
    },
    {
      category: "destinations",
      color: "#f0c30f",
    },
    {
      category: "conseils",
      color: "#ff5917",
    },
  ]

  const { query } = useRouter()
  let bgColor: string = "#f0c30f"
  let articles

  if (query.continent) {
    bgColor = ContinentsColor.find(
      (item) => query.continent === item.category
    ).color
    articles = continents.find(
      (continent) => query.continent === continent.slug
    ).articles
    console.log(articles)
  } else {
    bgColor = ContinentsColor.find(
      (item) => category.slug === item.category
    ).color
    articles = categories.find((item) => category.slug === item.slug).articles
    console.log(articles)
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <Header bgColor={bgColor}>
        <BannerImage>
          <CategoryBanner category={category.slug} />
          <ArticleTitle>{category.name}</ArticleTitle>
        </BannerImage>
      </Header>
      {/* <Articles
        articles={category.articles}
        title={category.name}
        category="destinations"
      /> */}
      <ContinentContainer>
        <ContainerRow>
          <ContinentFilter>
            {category.continents.map((continent, i) => {
              return (
                <Link
                  href={{
                    pathname: `/${category.slug}`,
                    query: { continent: `${continent.slug}` },
                  }}
                  key={continent.slug}
                  shallow={true}
                  passHref
                >
                  <ContinentName
                    bgColor={bgColor}
                    active={continent.slug === query.continent}
                    whileHover={{ scale: 1.1 }}
                  >
                    {continent.name}
                  </ContinentName>
                </Link>
              )
            })}
          </ContinentFilter>
          <AnimatePresence>
            {query.continent && (
              <Link
                href={{
                  pathname: `/${category.slug}`,
                }}
                shallow={true}
                passHref
              >
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FilterButton
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Filtre
                  </FilterButton>
                </motion.div>
              </Link>
            )}
          </AnimatePresence>
        </ContainerRow>
      </ContinentContainer>
      <ArticlesFilter articles={articles.reverse()} />
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
  const continents = await fetchAPI("/continents")

  return {
    props: { category, categories, continents },
    revalidate: 1,
  }
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

const ArticleTitle = styled.div`
  color: white;
  position: relative;
  font-size: 7vw;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 768px) {
    font-size: 9vw;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const ContinentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 60px;
`

const ContinentFilter = styled.div`
  color: #ffffff;
  text-align: center;
  padding-left: 0px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  column-gap: 20px;

  @media (max-width: 768px) {
    column-gap: 5px;
  }
`

const ContainerRow = styled.div`
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`

interface IContinentNameProps {
  bgColor: string
  active: boolean
}
const ContinentName = styled(motion.button)<IContinentNameProps>`
  background-color: ${(props) => (props.active ? props.bgColor : "#111111")};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: auto;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
  font-size: 1.2vw;
  font-family: "Arial Rounded MT Bold", sans-serif;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2.5vw;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

const FilterButton = styled(motion.button)`
  position: absolute;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 6px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #000;
  background-color: #e6e6e6;
  font-size: 1vw;
  font-family: "Arial Rounded MT Bold", sans-serif;
  margin-top: 10px;

  &:hover {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.4s;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    font-size: 1.8vw;
  }
`

export default Category
