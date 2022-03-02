import React, { useContext } from "react"
import styled from "styled-components"
import px2vw from "../utils/px2vw"
import { GlobalContext } from "../pages/_app"
import MyImage from "./image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import NewsletterSubscribe from "./NewsletterSubscribe"

interface IContext {
  location: {
    footerWorldMap: string
    name: string
  }
}

const FooterContent = () => {
  const { location } = useContext(GlobalContext) as IContext

  return (
    <div>
      <Grid>
        <Col>
          <TitleSection>J&apos;y suis actuellement</TitleSection>
          <WorldMap>
            <MyImage image={location.footerWorldMap} fullRatio={false} />
          </WorldMap>
          <LocationName>{location.name}</LocationName>
        </Col>
        <Col>
          <NewsletterSubscribe />
        </Col>
        <Col>
          <TitleSection>Suis moi sur les réseaux</TitleSection>
          <SocialMedia>
            <a
              href="https://www.instagram.com/bapt_et_cycy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="3x" />
            </a>
            {/* <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} size="3x" />
            </a> */}
            <a
              href="https://www.youtube.com/channel/UC-p1cqrppzJUpYrnGgKdpfw/featured"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} size="3x" />
            </a>
          </SocialMedia>
        </Col>
      </Grid>
      <Copyright>
        <FooterLink>
          <li>
            <Link as={`/a-propos`} href={`/a-propos`} passHref>
              A propos
            </Link>
          </li>
          <li>
            {" "}
            <Link as={`/mentions-legales`} href={`/mentions-legales`} passHref>
              Mentions Légales
            </Link>
          </li>
          <li>
            <Link as={`/contact`} href={`/contact`} passHref>
              Contact
            </Link>
          </li>
        </FooterLink>
        <p>
          ©2022 . fait avec ❤️ par <strong>Cyril</strong>
        </p>
      </Copyright>
    </div>
  )
}

export default FooterContent

const Grid = styled.div`
  position: relative;
  display: flex;
  margin-top: 3%;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`
const Col = styled.div`
  display: flex;
  width: ${px2vw(320, 320)};
  flex-direction: column;
  height: 100%;
  margin-top: ${px2vw(20)};

  @media (min-width: 768px) {
    width: ${px2vw(320, 768)};
    height: 100%;
  }
  @media (min-width: 1024px) {
    width: ${px2vw(500)};
    height: 100%;
  }
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Bebas Neue", "Open Sans", sans-serif;
  font-size: 1.3rem;
  color: white;

  ::before,
  ::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid white;
  }

  ::before {
    margin-right: 0.25em;
  }

  ::after {
    margin-left: 0.25em;
  }
`

const WorldMap = styled.div`
  margin: 0 15%;
  margin-top: 5%;
`

const LocationName = styled.p`
  font-family: "Roboto", "Open Sans", sans-serif;
  font-size: 1rem;
  color: white;
`

const SocialMedia = styled.div`
  margin: 12%;
  a {
    color: white;
    margin-right: 15px;
  }
`

const Copyright = styled.div`
  margin-top: 2%;
  font-family: "Roboto", "Open Sans", sans-serif;
  font-size: 1.2rem;
  color: white;
  text-align: center;

  strong {
    font-family: "Roboto bold", "Open Sans", sans-serif;
    font-weight: 800;
  }
`

const FooterLink = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 40px;
  list-style: none;
  margin: 2%;
  padding: 0;
  a {
    color: white;
    text-decoration: none;
  }
`
