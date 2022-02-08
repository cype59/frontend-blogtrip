import React, { createRef, RefObject, useEffect } from "react"
import lottie from "lottie-web"
import styled from "styled-components"
import destinations from "../lotties/destinations.json"
import conseils from "../lotties/conseils.json"
import aPropos from "../lotties/about.json"
import contact from "../lotties/contact.json"

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
    <div
      ref={animationContainer as RefObject<HTMLDivElement>}
      style={{ width: "20vw", height: "20vw" }}
    />
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
