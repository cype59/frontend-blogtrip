import { createRef, RefObject, useEffect, useState } from "react"
import { decode } from "html-entities"
import { motion } from "framer-motion"
import styled from "styled-components"
import { TitleSection } from "./footerContent"
import lottie from "lottie-web"
import sendLottie from "../lotties/send.json"

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null)

    if (!email) {
      setError("Ton email n'est pas valide")
      return null
    }

    const isFormValidated = onValidated({ EMAIL: email })

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null)
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault()
      // Trigger the button element with a click
      handleFormSubmit()
    }
  }

  let animationContainer = createRef()

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current as Element,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: sendLottie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    })
    return () => anim.destroy() // optional clean up for unmounting
  })

  return (
    <>
      <TitleSection>Newsletter</TitleSection>
      {status === "success" && status !== "error" && !error ? (
        <StyledLottieWrapper>
          <div
            ref={animationContainer as RefObject<HTMLDivElement>}
            style={{ height: "10vw" }}
          />
          <h2>Merci !</h2>
        </StyledLottieWrapper>
      ) : (
        <Form>
          <Email
            type="email"
            placeholder="Ton email"
            onChange={(event) => setEmail(event?.target?.value ?? "")}
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
          <Submit
            onClick={handleFormSubmit}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            S&apos;inscrire
          </Submit>
          {status === "error" || error ? (
            <StyledError>Ton email n&apos;est pas valide</StyledError>
          ) : (
            <div style={{ height: "50px" }}></div>
          )}
        </Form>
      )}
    </>
  )
}

const StyledLottieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  flex-direction: column;

  h2 {
    font-size: 22px;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: "#333333";
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  font-family: "Roboto", "Open Sans", sans-serif;
  height: 40px;
  padding-top: 10px;
`

const Form = styled.div`
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
  font-size: 1.1rem;

  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Roboto", "Open Sans", sans-serif;
`

const Submit = styled(motion.button)`
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
  margin-top: 8%;
  margin-bottom: 2%;
  &:hover {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    transition: all 0.4s;
  }

  @media (max-width: 1024px) {
    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    height: 50px;
  }
`

export default NewsletterForm
