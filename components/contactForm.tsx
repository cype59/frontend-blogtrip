import { getStrapiURL } from "../lib/api"
import { createRef, RefObject, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"
import lottie from "lottie-web"
import sendLottie from "../lotties/send.json"

const initalState = {
  nom: "",
  email: "",
  sujet: "",
  message: "",
}

const ContactForm = () => {
  const [state, setState] = useState(initalState)
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState("")
  const [isSend, setIsSend] = useState(false)

  async function addMessage() {
    const messageInfo = {
      name: state.nom,
      email: state.email,
      subject: state.sujet,
      message: state.message,
    }
    const requestUrl = getStrapiURL("/contacts")
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageInfo),
    }

    try {
      const add = await fetch(requestUrl, settings)
      const addResponse = await add.json()
      setIsSend(true)
      return addResponse
    } catch (e) {
      return e
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

  const handleSubmit = (e) => {
    e.preventDefault()

    for (let key in state) {
      if (state[key] === "") {
        setError(`Ton ${key} n'est pas valide`)
        setErrorType(key)
        return
      }
    }
    setError("")
    setErrorType("")
    addMessage()
  }

  const handleInput = (e) => {
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value

    setState((prev) => ({ ...prev, [inputName]: value }))
  }

  return !isSend ? (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h2>
          Si tu veux me contacter ou juste me dire bonjour c&apos;est ici que ça
          se passe ! Tu peux remplir simplement le formulaire ci-dessous
          j&apos;essayerais d&apos;y répondre au plus vite 😉
        </h2>
        <StyledLabel error={errorType === "nom"} htmlFor="name">
          Nom *
        </StyledLabel>
        <StyledInput
          type="text"
          name="nom"
          value={state.nom}
          onChange={handleInput}
          error={errorType === "nom"}
        />
        <StyledLabel error={errorType === "email"} htmlFor="email">
          Email *
        </StyledLabel>
        <StyledInput
          type="email"
          name="email"
          value={state.email}
          onChange={handleInput}
          error={errorType === "email"}
        />
        <StyledLabel error={errorType === "sujet"} htmlFor="subject">
          Sujet *
        </StyledLabel>
        <StyledInput
          type="text"
          name="sujet"
          value={state.sujet}
          onChange={handleInput}
          error={errorType === "sujet"}
        />
        <StyledLabel error={errorType === "message"} htmlFor="message">
          Message *
        </StyledLabel>
        <StyledTextArea
          value={state.message}
          onChange={handleInput}
          name="message"
          error={errorType === "message"}
        />
        {error && (
          <StyledError>
            <p>{error}</p>
          </StyledError>
        )}
        <SubmitButton
          type="submit"
          whileTap={{
            scale: 0.9,
            transition: {
              type: "tween",
              duration: 0.7,
              ease: "circOut",
            },
          }}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "tween",
              duration: 0.7,
              ease: "circOut",
            },
          }}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{ marginRight: "0.5rem" }}
          />
          <ButtonText>ENVOYER</ButtonText>
        </SubmitButton>
      </StyledForm>
    </StyledFormWrapper>
  ) : (
    <StyledLottieWrapper>
      <div
        ref={animationContainer as RefObject<HTMLDivElement>}
        style={{ height: "15vw" }}
      />
      <h2>
        Ton message est envoyé ! J&apos;y réponds dès que j&apos;ai du réseau 😉
      </h2>
    </StyledLottieWrapper>
  )
}

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 30px 0;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Roboto", "Open Sans", sans-serif;
`

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`
const StyledLottieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  h2 {
    font-size: 22px;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: "#333333";
    text-align: left;

    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
    }
  }
`

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 22px;
    font-family: "Roboto", "Open Sans", sans-serif;
    color: "#333333";
    margin-bottom: 2em;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`

interface IStyledInput {
  error: boolean
}

const StyledLabel = styled.label<IStyledInput>`
  color: ${(props) => props.error && "red"};
`

const StyledInput = styled.input<IStyledInput>`
  display: block;
  width: 100%;
  ${sharedStyles}
  border: ${(props) => props.error && "2px solid red"};
`

const StyledTextArea = styled.textarea<IStyledInput>`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
  border: ${(props) => props.error && "2px solid red"};
`

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  display: block;
  cursor: pointer;
  outline: none;
  border: none;
  height: 70px;
  border-radius: 6px;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #ffffff;
  background-color: #111111;
  font-size: 2vw;
  font-family: "Bebas Neue", "Roboto", "Open Sans", sans-serif;

  @media (max-width: 1024px) {
    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
`
const ButtonText = styled.span``
export default ContactForm
