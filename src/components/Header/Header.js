import "./Header.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../img/logoBookImg.PNG";
import HeroSection from "../HeroSection/HeroSection";
import headerImg from "../../img/img6.png";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className={
      pathname === "/" || 
      pathname === "/login" || 
      pathname === "/sign-up" || 
      pathname === "/blogs" ||
      pathname === "/my-items" ||
      pathname === "/add-items" ||
      pathname === "/inventory"
      ? `d-block`
      : `d-none`
    }>
      <div
        className={
          pathname.includes("login")
            ? `header-section`
            : pathname.includes("sign-up")
            ? `header-section`
            : pathname.includes("inventory")
            ? `header-section`
            : pathname.includes("my-items")
            ? `header-section`
            : pathname.includes("add-items")
            ? `header-section`
            : pathname.includes("blogs")
            ? `header-section`
            : `header-section header-section-height`
        }
      >
        <div className="pt-4 navbar-container">
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Link to="/">
                <div className="logo-img-container">
                  <img className="logo-img" src={logo} alt="logo" />
                </div>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-3` : `inactive-link mx-3`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-3` : `inactive-link mx-3`
                    }
                    to="/inventory"
                  >
                    Inventory
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-3` : `inactive-link mx-3`
                    }
                    to="/my-items"
                  >
                    My Items
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-3` : `inactive-link mx-3`
                    }
                    to="/add-items"
                  >
                    Add Items
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-3` : `inactive-link mx-3`
                    }
                    to="/blogs"
                  >
                    Blogs
                  </NavLink>
                </Nav>
                <Nav>
                  <NavLink className="mx-3 login-btn" to="/login">
                    Login
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div
          className={
            pathname.includes("login")
              ? "d-none"
              : pathname.includes("sign-up")
              ? "d-none"
              : pathname.includes("inventory")
              ? "d-none"
              : pathname.includes("my-items")
              ? "d-none"
              : pathname.includes("add-items")
              ? "d-none"
              : pathname.includes("blogs")
              ? "d-none"
              : `hero-container`
          }
        >
          <HeroSection></HeroSection>
        </div>
        <div
          className={
            pathname.includes("login")
              ? "d-none"
              : pathname.includes("sign-up")
              ? "d-none"
              : pathname.includes("inventory")
              ? `d-none`
              : pathname.includes("my-items")
              ? `d-none`
              : pathname.includes("add-items")
              ? `d-none`
              : pathname.includes("blogs")
              ? `d-none`
              : `header-img`
          }
        >
          <img src={headerImg} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
