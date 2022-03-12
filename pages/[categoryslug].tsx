import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import ArticlesFilter from "../components/articlesFilter"
import HeaderCategory from "../components/headerCategory"

interface ContinentColor {
  category: string
  color: string
}

const Category = ({ category, categories, countries }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  }

  console.log(countries)

  const ContinentsColor: ContinentColor[] = [
    // {
    //   category: "asie-du-sud-est",
    //   color: "#9b5ab4",
    // },
    // {
    //   category: "asie-du-sud",
    //   color: "#e64b3c",
    // },
    {
      category: "mexique",
      color: "#2dc873",
    },
    // {
    //   category: "amerique-centrale",
    //   color: "#3296dc",
    // },
    {
      category: "destinations",
      color: "#f0c30f",
    },
    {
      category: "conseils",
      color: "#ff5917",
    },
    {
      category: "journal",
      color: "#5fbd5c",
    },
  ]

  const { query } = useRouter()
  let bgColor: string = "#f0c30f"
  let articles

  function compareNombres(a, b) {
    return b.published_at > a.published_at
      ? -1
      : b.published_at < a.published_at
      ? 1
      : 0
  }

  if (query.country) {
    bgColor = ContinentsColor.find(
      (item) => query.country === item.category
    ).color
    articles = countries.find(
      (country) => query.country === country.slug
    ).articles
  } else {
    bgColor = ContinentsColor.find(
      (item) => category.slug === item.category
    ).color
    articles = categories.find((item) => category.slug === item.slug).articles
  }

  articles = articles.slice().sort(compareNombres).reverse()

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <HeaderCategory
        bgColor={bgColor}
        category={category.slug}
        title={category.name}
      />
      <ContinentContainer>
        <ContainerRow>
          <ContinentFilter>
            {category.countries.map((country, i) => {
              return (
                <Link
                  href={{
                    pathname: `/${category.slug}`,
                    query: { country: `${country.slug}` },
                  }}
                  key={country.slug}
                  shallow={true}
                  passHref
                >
                  <ContinentName
                    bgColor={bgColor}
                    active={country.slug === query.country}
                    whileHover={{ scale: 1.1 }}
                  >
                    {country.name}
                  </ContinentName>
                </Link>
              )
            })}
          </ContinentFilter>
          <AnimatePresence>
            {query.country && (
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
      <ArticlesFilter articles={articles} />
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
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const category = (
    await fetchAPI(`/categories?slug=${params.categoryslug}`)
  )[0]
  const categories = await fetchAPI("/categories")
  const countries = await fetchAPI("/countries")

  return {
    props: { category, categories, countries },
    revalidate: 1,
  }
}

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
  font-family: "Roboto", "Open Sans", sans-serif;
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
  font-family: "Roboto", "Open Sans", sans-serif;
  margin-top: 10px;

  &:hover {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.4s;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`

export default Category
