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
  font-family: "Roboto", "Open Sans", sans-serif;

  h1 {
    font-size: 6vw;
    font-family: "Bebas Neue", "Open Sans", sans-serif;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  p,
  li {
    font-family: "Roboto", "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    color: #111111;
    text-align: justify;
  }

  iframe {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100vw;
    max-width: 100%;
    height: 56.25vw;

    @media (min-width: 720px) {
      height: calc(720px * 0.5628205128205128);
    }
  }

  @media (max-width: 1024px) {
    width: 90%;
    margin-left: 5%;
  }

  .imgArticle {
    width: 100%;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    border-radius: 5px;
  }
  .imgArticle:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    border-radius: 5px;
    text-align: justify;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    /* box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5); */
  }

  blockquote p {
    display: inline;
    font-family: "Roboto", "Open Sans", sans-serif;
  }

  hr {
    border: none;
    border-top: 2px solid #111111;
    overflow: visible;
    text-align: center;
    height: 5px;
    display: flex;
    margin-top: 3em;
    margin-bottom: 3em;
  }

  hr:after {
    position: relative;
    content: " ";
    background-image: url(https://res.cloudinary.com/followmytrip/image/upload/v1634648735/logoFMTrip-icon.png);
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-color: white;
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: auto;
    top: -26px;
  }
`

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
