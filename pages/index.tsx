import React from "react"
import Banner from "../components/banner"
import Articles from "../components/articles"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"

const Home = ({ articles, categories, homepage }) => {
  function compareNombres(a, b) {
    return b.published_at > a.published_at
      ? -1
      : b.published_at < a.published_at
      ? 1
      : 0
  }
  const articlesInOrder = articles.slice().sort(compareNombres)
  const lastArticles = articlesInOrder
    .slice(articlesInOrder.length - 4, articlesInOrder.length)
    .reverse()

  let AmSArticles =
    articlesInOrder &&
    articlesInOrder.filter(
      (article) => article.continent?.slug === "amerique-du-sud"
    )
  AmSArticles = AmSArticles.slice(
    AmSArticles.length - 4,
    AmSArticles.length
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
      <Articles
        articles={lastArticles}
        title="Derniers articles"
        category="destinations"
        query=""
      />
      <Articles
        articles={conseilsArticles}
        title="Conseils et Astuces"
        category="conseils"
        query=""
      />
      <Articles
        articles={AmSArticles}
        title="Amérique du Sud"
        category="destinations"
        query="amerique-du-sud"
      />
    </Layout>
  )
}

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
