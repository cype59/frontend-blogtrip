import React from "react"
import styled from "styled-components"
import Footer from "./footer"
import Nav from "./nav"

const Layout = ({ children, categories }) => (
  <Container>
    <Nav categories={categories} />
    <div style={{ flex: "1 0 auto" }}>{children}</div>
    <Footer />
  </Container>
)

export default Layout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
