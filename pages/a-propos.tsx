import styled from "styled-components"
import CategoryBanner from "../components/categoryBanner"
import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import { ArticleTitle, BannerImage, Header } from "./[categoryslug]"
// import Image from "next/image"
// import baptCyril from "../images/baptCyril.jpg"
// import baptCyrilv0 from "../images/baptCyrilv0.jpg"

const Apropos = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div>
        <Header bgColor={"#DFD5A5"}>
          <BannerImage>
            <CategoryBanner category={"aPropos"} />
            <ArticleTitle>A propos</ArticleTitle>
          </BannerImage>
        </Header>
        <Container>
          <h1>Le commencement...</h1>
          <p>
            <strong>Baptiste et Moi (Cyril)</strong> sommes meilleurs potes
            depuis quasiment le jour de notre naissance. Nous venons d’une
            petite ville dans le Nord de la France : Cysoing, et avons passé
            toute notre enfance dans la même classe, donc forcément on se
            connait très bien ! C’est seulement lors de nos études supérieures
            que l’on a pris des chemins un peu différents. Lui a fait une école
            de commerce à Lille et moi une école d’Ingénieur à Paris.
          </p>
          {/* <ImageContainer>
            <ImageLeft>
              <Image src={baptCyrilv0} alt="baptiste et Moi (Cyril)" />
            </ImageLeft>
            <ImageRight>
              <Image src={baptCyril} alt="baptiste et Moi (Cyril)" />
            </ImageRight>
          </ImageContainer> */}
          <p>
            Au retour de son semestre à l’étranger en Colombie, l’envie de
            partir voyager et de <strong>faire un tour du monde</strong> est née
            chez Bapt et bien sûr, il avait besoin d’un compagnon de galère.
            C’est comme ça qu’il m’a proposé cette idée.
          </p>
          <p>
            Pour ma part, j’ai toujours eu la chance de beaucoup voyager avec
            mes parents et j’ai donc cette « fibre voyage » en moi depuis
            enfant. Donc forcement, quand Baptiste a pensé à cette possibilité
            de faire le tour du monde,
            <strong> j’ai tout de suite accroché !</strong>
          </p>
          <p>
            Mais bon, passer d’une simple envie à un réel projet n’est pas une
            chose aisée…Finalement je dois mon déclic à la pandémie du COVID-19.
            Je devais en effet partir 6 mois faire mon échange académique à
            Taiwan dans une superbe université ! et puis au dernier moment,
            alors que les préparatifs étaient déjà entamés, l’échange est annulé
            à cause de la pandémie. Ce gros coup d’arrêt a finalement{" "}
            <strong>
              confirmé mon envie de partir et de faire ce beau projet !
            </strong>
          </p>
          <h1>La création du Blog</h1>
          <p>
            Etant issue d’une formation d’Ingénieur du numérique, j’ai effectué
            la majorité de mes stages dans le
            <strong> développement front-end d’application et site Web</strong>,
            notamment à Décathlon ou à Dassault Systèmes. J’ai toujours adoré ça
            et c’est finalement devenu une réelle passion. Donc forcément, au
            fur et à mesure des préparatifs du voyage, mon envie de créer un
            blog pour partager nos aventures a émergé. De cette envie est née
            <strong> FollowMyTrip</strong>, mon premier site en ligne et blog
            voyage.
          </p>
          <p>
            Bapt et moi allons essayé de partager un maximum d’infos sur notre
            périple pour tenir au courant nos lecteurs (hello papa maman) ! Et
            puis si ce blog peut motiver certains d’entre vous à sauter le pas
            pour voyager ce sera d’autant plus cool !
          </p>
          <h2>
            A au fait, nous sommes partis depuis le 28 février 2022 et
            normalement, à l’heure où vous lisez ces quelques lignes, nous
            sommes encore en chemin 😁
          </h2>
        </Container>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categories] = await Promise.all([fetchAPI("/categories")])

  return {
    props: { categories },
    revalidate: 1,
  }
}

const ImageContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`
const ImageLeft = styled.div`
  width: 49%;
  float: left;
  margin-bottom: 2.5em;
`
const ImageRight = styled.div`
  width: 49%;
  float: right;
  margin-bottom: 2.5em;
`
const Container = styled.div`
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  font-family: "Roboto", "Open Sans", sans-serif;

  h1 {
    font-size: 4.5vw;
    font-family: "Bebas Neue", "Open Sans", sans-serif;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: "#111111";

    @media (max-width: 1024px) {
      font-size: 7vw;
    }

    @media (max-width: 768px) {
      font-size: 10vw;
    }
  }

  h2 {
    font-size: 1.5vw;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: "#333333";
    margin-bottom: 2em;
    margin-top: 2em;
    text-align: justify;
    @media (max-width: 1024px) {
      font-size: 3vw;
    }

    @media (max-width: 768px) {
      font-size: 4.5vw;
    }
  }
  p {
    font-family: "Roboto", "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    color: #111111;
    text-align: justify;
  }

  strong {
    font-weight: 900;
    font-family: "Roboto Bold", "Open Sans", sans-serif;
  }

  img {
    width: 100%;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    border-radius: 5px;
  }

  img:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 1024px) {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
`

export default Apropos
