import styled from "styled-components"
import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import HeaderCategory from "../components/headerCategory"

const MentionsLegales = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div>
        <HeaderCategory
          bgColor={"#0F4C5C"}
          category={"MentionsLegales"}
          title={"Mentions Légales"}
        />
        <Container>
          <h1>A propos</h1>
          <p>
            <strong>Responsable éditorial</strong> : Cyril Pierron
          </p>
          <p>
            <strong>Adresse</strong> : 1086 rue Jean Baptiste Lebas, 59830
            Cysoing, France
          </p>
          <p>
            <strong>Téléphone</strong> : 06 51 16 12 45
          </p>
          <p>
            <strong>Email</strong> : cyril.pierron@followmytrip.fr
          </p>
          <h1>Hébergement</h1>
          <h2>Des données</h2>
          <p>
            <strong>Hébergeur</strong> : Heroku Inc
          </p>
          <p>
            <strong>Adresse</strong> : 650 7th Street, San Francisco, CA (tel :
            +33 1 (877) 563-4311)
          </p>
          <p>
            <strong>Site</strong> : https://www.heroku.com
          </p>
          <h2>Du site</h2>
          <p>
            <strong>Hébergeur</strong> : Vercel Inc
          </p>
          <p>
            <strong>Adresse</strong> : 340 S Lemon Ave #4133, Walnut CA 91789,
            United States
          </p>
          <p>
            <strong>Site</strong> : https://www.vercel.com
          </p>
          <h1>Conditions d&apos;utilisations</h1>
          <p>
            Ce site (www.followmytrip.fr) utilise des outils modernes de
            développement, pour un meilleur confort d’utilisation je vous
            recommande de recourir à des navigateurs récents comme Google
            Chrome, Safari, Firefox.
          </p>
          <p>
            Au travers de ce blog l&apos;éditeur met en œuvre tous les moyens
            disponibles, pour assurer une information fiable et une mise à jour
            régulière du site internet. Cependant, des erreurs ou oublis peuvent
            survenir. L’internaute devra donc s’assurer de l’exactitude des
            informations et les auteurs de FollowMyTrip.fr ne peuvent en aucun
            cas être tenus responsables de l’utilisation faite de ces
            informations, et de tout préjudice direct ou indirect pouvant en
            découler.
          </p>
          <h1>Responsabilité dans l’utilisation du service</h1>
          <p>
            L’utilisateur s’engage à s’abstenir de poster des messages
            illicites, diffamants ou insultants sur le site. Les commentaires
            déposés par les internautes reflètent exclusivement l’avis de leurs
            auteurs et demeurent sous leur responsabilité. En écrivant des
            commentaires sur le site, l’internaute accepte de se soumettre aux
            lois françaises et internationales.
          </p>
          <p>
            Les administrateurs du site se réservent le droit de modérer,
            modifier ou supprimer tout commentaire qu’ils jugeraient contraire à
            ces lois.
          </p>
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
    color: #111111;

    @media (max-width: 1024px) {
      font-size: 7vw;
    }

    @media (max-width: 768px) {
      font-size: 10vw;
    }
  }

  p {
    font-family: "Roboto", "Open Sans", sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    color: #111111;
    text-align: justify;
  }

  h2 {
    font-size: 2vw;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: #4b4b4b;
    margin-top: 1em;
    text-align: justify;
    @media (max-width: 1024px) {
      font-size: 3vw;
    }

    @media (max-width: 768px) {
      font-size: 4.5vw;
    }
  }

  strong {
    font-weight: 900;
    font-family: "Roboto Bold", "Open Sans", sans-serif;
  }

  @media (max-width: 1024px) {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
`

export default MentionsLegales
