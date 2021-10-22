import React, { useContext } from "react"
import styled from "styled-components"
import px2vw from "../utils/px2vw"
import { GlobalContext } from "../pages/_app"
import MyImage from "./image"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons"

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
          <TitleSection>Newsletter</TitleSection>
          <Form>
            <Email type="email" placeholder="Ton email" />
            <Submit
              type="submit"
              value="S'inscrire"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            />
          </Form>
        </Col>
        <Col>
          <TitleSection>Suis moi sur les réseaux</TitleSection>
          <SocialMedia>
            <a
              href="https://www.instagram.com/cyrilprn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="3x" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} size="3x" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} size="3x" />
            </a>
          </SocialMedia>
        </Col>
      </Grid>
      <Copyright>
        <FooterLink>
          <li>A propos</li>
          <li>Mentions légales</li>
          <li>Contact</li>
        </FooterLink>
        <p>
          ©2021 . fait avec ❤️ par <strong>Cyril</strong>
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

const TitleSection = styled.div`
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

const Form = styled.form`
  margin: 0 15%;
  margin-top: 5%;
  display: flex;
  height: 100%;
  flex-direction: column;
  font-family: "Roboto", "Open Sans", sans-serif;
`
const Email = styled.input`
  text-align: center;
  color: #111111;
  margin-left: 10%;
  margin-right: 10%;
  height: 50px;
  border: none;
  font-size: 1.1rem;
`
const Submit = styled(motion.input)`
  margin: 10%;
  margin-left: 10%;
  margin-right: 10%;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 6px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #000;
  background-color: #e6e6e6;
  font-size: 1.5vw;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;

  &:hover {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.4s;
  }

  @media (max-width: 1024px) {
    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
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
`