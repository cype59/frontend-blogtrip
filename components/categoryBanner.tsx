import React, { createRef, RefObject, useEffect } from "react"
import lottie from "lottie-web"
import styled from "styled-components"
import destinations from "../lotties/destinations.json"
import conseils from "../lotties/conseils.json"
import aPropos from "../lotties/about.json"
import contact from "../lotties/contact.json"
import legal from "../lotties/legal.json"
import journal from "../lotties/journal.json"

const CategoryBanner = (category) => {
  let animationContainer = createRef()

  let data

  if (category.category === "destinations") {
    data = destinations
  } else if (category.category === "conseils") {
    data = conseils
  } else if (category.category === "aPropos") {
    data = aPropos
  } else if (category.category === "contact") {
    data = contact
  } else if (category.category === "MentionsLegales") {
    data = legal
  } else if (category.category === "journal") {
    data = journal
  }

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current as Element,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: data,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    })
    return () => anim.destroy() // optional clean up for unmounting
  })

  return (
    <LottieContainer ref={animationContainer as RefObject<HTMLDivElement>} />
  )
}

export default CategoryBanner

interface IDisplayLoaderProps {
  bgColor: string
}

const DisplayLoader = styled.div<IDisplayLoaderProps>`
  display: "flex";
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${(props) => props.bgColor};
`
const LottieContainer = styled.div`
  width: 20vw;
  height: 20vw;

  @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
  }
`
