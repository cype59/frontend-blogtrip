import React from "react"
import Banner from "../components/banner"
import Articles from "../components/articles"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"

const Home = ({ articles, categories, homepage }) => {
  const lastArticles = articles
    .slice(articles.length - 4, articles.length)
    .reverse()
  const ASEstArticles =
    articles &&
    articles.filter((article) => article.continent?.slug === "asie-du-sud-est")
  const AmSArticles =
    articles &&
    articles.filter((article) => article.continent?.slug === "amerique-du-sud")

  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <Banner lastArticle={articles[articles.length - 1]} />
      <Articles
        articles={lastArticles}
        title="Derniers articles"
        category="destinations"
        query=""
      />
      <Articles
        articles={ASEstArticles}
        title="Asie du Sud-Est"
        category="destinations"
        query="asie-du-sud-est"
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
