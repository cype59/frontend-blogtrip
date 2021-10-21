import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI, getStrapiURL } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BannerArticle from "./bannerArticle"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import DisqusComments from "../../components/DisqusComments"
import { usePalette } from "react-palette"
import { Link } from "react-scroll"
import { motion } from "framer-motion"

const Article = ({ article, categories }) => {
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  const [show, handleShow] = useState(false)
  const [buttonHover, handleButtonHover] = useState(false)
  const [indexHover, handleIndexHover] = useState<number>(-1)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener("scroll", this)
    }
  }, [])

  let strapiUrl: string = ""

  if (`${process.env.NODE_ENV}` === "production") {
    strapiUrl = article.image.url
  } else {
    strapiUrl = `http://localhost:1337${article.image.url}`
  }

  const { data, loading, error } = usePalette(strapiUrl)

  const getHeadings = (source) => {
    const regex = /^# (.*$)/gim

    if (source.match(regex)) {
      return source.match(regex).map((heading) => {
        const headingText = heading.replace(/^# (.*$)/gim, "$1")

        const link = headingText.toLowerCase().replace(/ /g, "-")

        return {
          text: headingText,
          link: link,
        }
      })
    }

    return []
  }

  const headings = getHeadings(article.content)
  function flatten(text, child) {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  }

  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children)
    var text = children.reduce(flatten, "")
    var slug = text.toLowerCase().replace(/ /g, "-")
    return React.createElement("h" + props.level, { id: slug }, props.children)
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <BannerArticle image={article.image} title={article.title} />
      <ContainerGrid>
        <GridColumn>
          {headings.length > 0 ? (
            <VerticalList color={data.darkVibrant} show={show}>
              <VerticalLine color={data.darkVibrant} />
              {headings.map((heading, index) => (
                <li key={heading.text}>
                  <motion.div
                    onHoverStart={() => {
                      handleButtonHover(true)
                      handleIndexHover(index)
                    }}
                    onHoverEnd={() => {
                      handleButtonHover(false)
                      handleIndexHover(-1)
                    }}
                  >
                    <Link
                      smooth={true}
                      duration={500}
                      to={heading.link}
                      offset={-100}
                    >
                      <ContentCircle
                        color={data.darkVibrant}
                        hover={buttonHover && indexHover === index}
                      ></ContentCircle>
                    </Link>
                    <ContentCard
                      show={buttonHover && indexHover === index && show}
                      color={data.lightMuted}
                    >
                      <ContentTitle
                        smooth={true}
                        duration={500}
                        to={heading.link}
                        offset={-100}
                        className="contentTitle"
                      >
                        {heading.text}
                      </ContentTitle>
                    </ContentCard>
                  </motion.div>
                </li>
              ))}
            </VerticalList>
          ) : null}
        </GridColumn>

        <ArticleContainer
          colorH1={data.darkVibrant}
          colorH2={data.muted}
          colorLi={data.darkVibrant}
        >
          <ReactMarkdown
            source={article.content}
            escapeHtml={false}
            renderers={{ heading: HeadingRenderer }}
          />
          <p style={{ marginTop: "5em" }}>Ecrit par {article.author.name}</p>
          <p>
            Mis à jour le{" "}
            <Moment format="DD/MM/YYYY">{article.updated_at}</Moment>
          </p>
        </ArticleContainer>
      </ContainerGrid>
      <CommentsContainer color={data.darkVibrant}>
        <DisqusComments article={article} />
      </CommentsContainer>
    </Layout>
  )
}

const ContainerGrid = styled.div`
  display: flex;
  flex-direction: row;
`

const CommentsContainer = styled.div<IVerticalLineProps>`
  padding-left: 20%;
  padding-right: 20%;
  font-family: "Roboto", "Open Sans", sans-serif;
  background-color: #111111;
  position: absolute;
  height: 100%;
  width: 60%;
  border-top: ${(props) => `20px solid ${props.color}`};

  margin-top: 5%;

  @media (max-width: 1024px) {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
  }
`

const GridColumn = styled.div`
  width: 20%;
  @media (max-width: 1024px) {
    display: none;
  }
`

interface IContentCircleProps {
  color: string
  hover: boolean
}
const ContentCircle = styled.span<IContentCircleProps>`
  margin-top: -10px;
  top: 50%;
  left: -35px;
  width: 10px;
  height: 10px;
  background: ${(props) => (props.hover ? props.color : "white")};
  border: ${(props) => `5px solid ${props.color}`};
  transition: background 0.1s ease-in-out;
  border-radius: 50%;
  display: block;
  position: absolute;
  cursor: pointer;
`

const ContentTitle = styled(Link)`
  color: #111111;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Roboto", "Open Sans", sans-serif;
`

interface IContentCardProps {
  show: boolean
  color?: string
}
const ContentCard = styled(motion.button)<IContentCardProps>`
  opacity: ${(props) => (props.show ? "1" : "0")};
  background-color: ${(props) => (props.color ? props.color : "#dadada")};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: auto;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
  text-align: start;
  margin-top: 10px;
`

interface IVerticalLineProps {
  color: string
  show?: boolean
}

const VerticalLine = styled.div<IVerticalLineProps>`
  border-radius: 10px;
  left: 0;
  position: absolute;
  height: 100%;
  width: 10px;
  background-color: ${(props) => (props.color ? props.color : "#111111")};
`

const VerticalList = styled.ul<IVerticalLineProps>`
  list-style: none;
  width: 13%;
  margin-left: 30px;
  bottom: 20px;
  padding-left: 30px;
  position: fixed;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-30%)")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: all 0.3s ease-in-out;

  li {
    position: relative;
    font-family: "Roboto", "Open Sans", sans-serif;
    height: 50px;
  }
`

interface IArticleContainerProps {
  colorH1: string
  colorH2: string
  colorLi: string
}

const ArticleContainer = styled.div<IArticleContainerProps>`
  width: 60%;
  margin-right: 20%;
  font-family: "Roboto", "Open Sans", sans-serif;

  h1 {
    font-size: 4.5vw;
    font-family: "Bebas Neue", "Open Sans", sans-serif;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: ${(props) => (props.colorH1 ? props.colorH1 : "#111111")};

    @media (max-width: 1024px) {
      font-size: 7vw;
    }

    @media (max-width: 768px) {
      font-size: 10vw;
    }
  }

  h2 {
    font-size: 2vw;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: ${(props) => (props.colorH2 ? props.colorH2 : "#333333")};
    margin-bottom: 1em;
    @media (max-width: 1024px) {
      font-size: 3vw;
    }

    @media (max-width: 768px) {
      font-size: 4.5vw;
    }
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

  li {
    color: ${(props) => (props.colorLi ? props.colorLi : "#111111")};
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
    margin-right: 5%;
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
    background: "#f9f9f9";
    border-left: ${(props) =>
      props.colorH1 ? `10px solid ${props.colorH1}` : "10px solid #ccc"};
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

    &::after {
      position: relative;
      content: " ";
      background-image: url(https://res.cloudinary.com/followmytrip/image/upload/v1634648735/logoFMTrip-icon.png);
      background-size: 50px 60px;
      background-repeat: no-repeat;
      background-color: white;
      height: 60px;
      width: 50px;
      margin-left: auto;
      margin-right: auto;
      top: -31px;
    }
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
