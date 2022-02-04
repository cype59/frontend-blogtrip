import React from "react"
import Banner from "../components/banner"
import Articles from "../components/articles"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"

const Home = ({ articles, categories, homepage }) => {
  const last4Articles = articles
    .slice()
    .sort((a, b) => b.published_at - a.published_at)

  console.log(last4Articles)
  const lastArticles = last4Articles
    .slice(last4Articles.length - 4, last4Articles.length)
    .reverse()
  const AmSArticles =
    articles &&
    articles.filter((article) => article.continent?.slug === "amerique-du-sud")

  const conseilsArticles =
    articles &&
    articles.filter((article) => article.category?.slug === "conseils")
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
