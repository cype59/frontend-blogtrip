import React from "react"
import styled from "styled-components"
import FooterContent from "./footerContent"

const Footer = () => {
  return (
    <FooterComponent>
      <FooterContent />
    </FooterComponent>
  )
}

export default Footer

const FooterComponent = styled.footer`
  background: #111111;
  width: 100%;
  flex-shrink: 0;
  color: white;
`
