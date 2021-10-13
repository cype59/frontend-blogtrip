import { motion } from "framer-motion"
import React from "react"
import Lottie from "react-lottie"
import styled from "styled-components"
import earthLoader from "../lotties/earth-bouncing.json"

const Loader = ({ loading }) => {
  const bgColor = [
    "#19be9b",
    "#2dc873",
    "#3296dc",
    "#9b5ab4",
    "#f0c30f",
    "#e67d23",
    "#e64b3c",
  ]
  if (loading) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: earthLoader,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }

    const randombgColor = bgColor[Math.floor(Math.random() * bgColor.length)]

    return (
      <DisplayLoader bgColor={randombgColor}>
        <motion.div
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
          exit={{ y: -300 }}
        >
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            speed={1.5}
          />
        </motion.div>
      </DisplayLoader>
    )
  } else {
    return null
  }
}

export default Loader

interface IDisplayLoaderProps {
  bgColor: string
}

const DisplayLoader = styled.div<IDisplayLoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.bgColor};
`
