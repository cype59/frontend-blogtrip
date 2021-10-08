import React, { useEffect, useState } from "react"
import Link from "next/link"
import styled from "styled-components"
import logo from "../images/logoFMTrip_V03.png"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons"

const Nav = ({ categories }) => {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener("scroll", this)
    }
  }, [])
  return (
    <div>
      <Navbar show={show}>
        <NavbarItems>
          <Item>
            <Logo>
              <Link href="/" passHref>
                <Image src={logo} alt="FMTripLogo" />
              </Link>
            </Logo>
          </Item>
          <Item>
            <Link href="/" passHref>
              <Name>Accueil</Name>
            </Link>
          </Item>
          <Item>
            <Link href="/destinations" passHref>
              <Name>Destinations</Name>
            </Link>
          </Item>
          <Item>
            <Link href="/conseils" passHref>
              <Name>Conseils</Name>
            </Link>
          </Item>

          {/* {categories.map((category) => {
            return (
              <Item key={category.id}>
                <Link
                  as={`/category/${category.slug}`}
                  href="/category/[id]"
                  passHref
                >
                  <Name>{category.name}</Name>
                </Link>
              </Item>
            )
          })} */}
        </NavbarItems>
        <SocialMedia>
          <a
            href="https://www.instagram.com/cyrilprn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          {/* <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a> */}
        </SocialMedia>
      </Navbar>
    </div>
  )
}

interface NavbarProps {
  show: boolean
}

const Navbar = styled.div<NavbarProps>`
  position: fixed;
  align-items: center;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  background: ${(props) =>
    props.show
      ? "#111111"
      : "linear-gradient(180deg, #111111a4 0%, rgba(17,17,17,0) 100%)"};

  transition: ${(props) => !props.show && "background 0.4s ease-in"};
`

const Logo = styled.div`
  position: relative;
  width: 70px;
  height: auto;
`

const NavbarItems = styled.ul`
  cursor: pointer;
  list-style: none;
  display: flex;
  position: relative;
  align-items: center;
  padding-left: 0px;
`

const Item = styled.li`
  margin-left: 50px;
`

const SocialMedia = styled.div`
  a {
    color: white;
    margin-right: 15px;
  }
`

const Name = styled.a`
  color: white;
  font-size: 1rem;
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  padding: 1rem 0 0.5rem;

  /* &:hover {
    transition: all 0.2s ease-in;
  } */

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) scaleX(0);
    transform-origin: 50% 50%;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.8);
    transition: transform 250ms;
  }

  &:hover {
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`

export default Nav
