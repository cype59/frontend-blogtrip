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
import { useRouter } from "next/router"

const Nav = ({ categories }) => {
  const [show, handleShow] = useState(false)
  const [open, setOpen] = useState(false)

  const [currentPath, setCurrentPath] = useState<String>("")
  const router = useRouter()

  if (currentPath !== router.asPath) {
    setCurrentPath(router.asPath)
    setOpen(false)
  }

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
          {categories.map((category, i) => {
            return (
              <Item key={category.id}>
                <Link href={`/${category.slug}`} passHref>
                  <Name>{`${category.name}`}</Name>
                </Link>
              </Item>
            )
          })}
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
      <NavbarBurger show={show}>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
        <Logo>
          <Link href="/" passHref>
            <Image src={logo} alt="FMTripLogo" />
          </Link>
        </Logo>
        <StyledMenu open={open}>
          <Link href="/" passHref>
            <Name className="NameMenu">Accueil</Name>
          </Link>
          <Link href="/destinations" passHref>
            <Name className="NameMenu">Destinations</Name>
          </Link>
          <Link href="/conseils" passHref>
            <Name className="NameMenu">Conseils</Name>
          </Link>
        </StyledMenu>
      </NavbarBurger>
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
  height: 70px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  background: ${(props) =>
    props.show
      ? "#111111"
      : "linear-gradient(180deg, #111111a4 0%, rgba(17,17,17,0) 100%)"};

  transition: ${(props) => !props.show && "background 0.4s ease-in"};

  @media (max-width: 768px) {
    display: none;
    z-index: 6;
  }
`

const Logo = styled.div`
  position: relative;
  width: 85px;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 80px;
    left: 10px;
    z-index: 6;
  }
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
  font-size: 1.5rem;
  text-decoration: none;
  font-family: "Bebas Neue", "Open Sans", sans-serif;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  padding: 1rem 0 0.5rem;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%) scaleX(0);
    transform-origin: 50% 50%;
    width: 100%;
    height: 2px;
    background-color: rgb(255, 255, 255);
    transition: transform 250ms;
  }

  &:hover {
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`

interface INavbarBurgerProps {
  show: boolean
}

const NavbarBurger = styled.div<INavbarBurgerProps>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    background: ${(props) =>
      props.show
        ? "#111111"
        : "linear-gradient(180deg, #111111a4 0%, rgba(17,17,17,0) 100%)"};

    transition: ${(props) => !props.show && "background 0.4s ease-in"};
    align-items: center;
  }
`

const StyledMenu = styled.nav<IStyledBurgerProps>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    flex-direction: column;
    justify-content: center;
    background: #111111;
    transform: ${(props) =>
      props.open ? "translateY(0%)" : "translateY(-100%)"};
    transition: transform 0.3s ease-in-out;
    padding-top: 15px;
    .NameMenu {
      font-size: 2rem;
      padding: 1rem 0;
      color: #ffffff;
      transition: color 0.3s linear;
      text-align: center;

      &::after {
        display: none;
      }
    }
  }
`

interface IStyledBurgerProps {
  open: boolean
}

const StyledBurger = styled.button<IStyledBurgerProps>`
  display: none;
  @media (max-width: 768px) {
    position: absolute;
    right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
      outline: none;
    }

    div {
      width: 2rem;
      height: 0.25rem;
      background: ${(props) => (props.open ? "#EFFFFA" : "#EFFFFA")};
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;

      :first-child {
        transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(0)")};
      }

      :nth-child(2) {
        opacity: ${(props) => (props.open ? "0" : "1")};
        transform: ${(props) =>
          props.open ? "translateX(20px)" : "translateX(0)"};
      }

      :nth-child(3) {
        transform: ${(props) => (props.open ? "rotate(-45deg)" : "rotate(0)")};
      }
    }
  }
`

export default Nav
