import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import styled from "styled-components"
import MyImage from "./image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMousePointer } from "@fortawesome/free-solid-svg-icons"

const Card = ({ article }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <motion.div
      onHoverStart={() => {
        setIsHover(true)
      }}
      whileHover={{
        scale: 1.3,
        y: -60,
        zIndex: 2,
        transition: {
          type: "tween",
          delay: 0.4,
          duration: 0.7,
        },
      }}
      onHoverEnd={() => {
        setIsHover(false)
      }}
    >
      <Container>
        <CardItem>
          <CardTitle>{article.title}</CardTitle>
          <MyImage image={article.image} fullRatio={false} />
        </CardItem>
        <AnimatePresence>
          {isHover && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  type: "tween",
                  delay: 0.5,
                  duration: 0.2,
                },
              }}
              exit={{ opacity: 0 }}
            >
              <CardDescription>
                <p>{article.description}</p>
                <div>
                  <FontAwesomeIcon
                    icon={faMousePointer}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Clic pour lire l&apos;article
                </div>
              </CardDescription>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.div>
  )
}

const Container = styled.div`
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); */
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  }
`

const CardItem = styled.div`
  position: relative;
  width: 100%;
`

const CardTitle = styled.h3`
  color: white;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  font-weight: 100;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;
  text-transform: uppercase;
  margin-left: 1rem;
  font-size: 2vw;
  position: absolute;
  bottom: -15px;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 2.3vw;
    bottom: 0px;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
    width: 100%;
    font-size: 6vw;
  }
`

const CardDescription = styled.div`
  background-color: #111111;
  font-family: "Roboto", "Open Sans", sans-serif;
  position: absolute;
  height: 90px;
  width: 100%;
  bottom: -88px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  text-align: center;
  z-index: 2;

  p {
    position: relative;
    margin-top: 25%;
    height: 50%;
    color: white;
    width: 100%;
    margin: auto; /* Important */
    font-size: 1vw;
    margin-top: 1rem;
  }

  div {
    color: #acacac;
    font-size: 0.7vw;
    position: absolute;
    bottom: 5px;
    width: 100%;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 2vw;
    }

    div {
      font-size: 1vw;
    }
  }

  @media (max-width: 768px) {
    bottom: -58px;
    height: 60px;
  }
`

export default Card
