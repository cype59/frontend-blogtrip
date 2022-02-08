import styled from "styled-components"
import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import HeaderCategory from "../components/headerCategory"
import ContactForm from "../components/contactForm"

const Contact = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div>
        <HeaderCategory
          bgColor={"#0F4C5C"}
          category={"contact"}
          title={"Contact"}
        />
        <Container>
          <ContactForm />
        </Container>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categories] = await Promise.all([fetchAPI("/categories")])

  return {
    props: { categories },
    revalidate: 1,
  }
}

const Container = styled.div`
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 5%;
  margin-top: 5%;
  font-family: "Roboto", "Open Sans", sans-serif;

  @media (max-width: 1024px) {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 10%;
    margin-top: 10%;
  }
`

export default Contact
