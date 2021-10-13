import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BannerArticle from "./bannerArticle"
import styled from "styled-components"
import React from "react"
import DisqusComments from "../../components/DisqusComments"

const Article = ({ article, categories }) => {
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <BannerArticle image={article.image} title={article.title} />
      <ArticleContainer>
        <ReactMarkdown source={article.content} escapeHtml={false} />
        <hr />
        <p>Ecrit par {article.author.name}</p>
        <p>
          Mis à jour le{" "}
          <Moment format="DD/MM/YYYY">{article.updated_at}</Moment>
        </p>
        <DisqusComments article={article} />
      </ArticleContainer>
    </Layout>
  )
}

const ArticleContainer = styled.div`
  width: 60%;
  margin-left: 20%;
  font-family: "Open Sans", sans-serif;

  h1 {
    font-size: 4vw;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
  }

  p {
    font-family: -apple-system, BlinkMacSystemFont, "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    background: #fff;
    color: #666;
    text-align: justify;
  }

  iframe {
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @media (max-width: 1024px) {
    width: 80%;
    margin-left: 10%;
  }
`

const BannerAuthor = styled.div``

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles")

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`)
  const categories = await fetchAPI("/categories")

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  }
}

export default Article
