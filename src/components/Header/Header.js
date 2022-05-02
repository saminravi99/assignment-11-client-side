import "./Header.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../img/logoBookImg.PNG";
import HeroSection from "../HeroSection/HeroSection";
import headerImg from "../../img/img6.png";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // React Hooks for navigating and getting the pathname
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let from = navigate?.state?.from?.pathname || "/login";

  // React Firebase Hook for getting the current user
  const [authUser] = useAuth();

  //Using Function to Sign Out Using Firebase Hooks
  const handleSignOut = () => {
    signOut(auth);
    navigate(from);
  };

  return (
    <div
      className={
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/sign-up" ||
        pathname === "/blogs" ||
        pathname === "/my-items" ||
        pathname === "/add-items" ||
        pathname === "/inventory" ||
        pathname === "/about-us" ||
        pathname === "/manage-inventory"
          ? `d-block`
          : `d-none`
      }
    >
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
            : pathname.includes("about-us")
            ? `header-section`
            : pathname.includes("manage-inventory")
            ? `header-section`
            : `header-section header-section-height`
        }
      >
        <div className="pt-4 navbar-container">
          <Navbar className="navbar-bg" collapseOnSelect expand="lg">
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
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/inventory"
                  >
                    Inventory
                  </NavLink>
                  <span>
                    {authUser && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? `active-link mx-2` : `inactive-link mx-2`
                        }
                        to="/my-items"
                      >
                        My Items
                      </NavLink>
                    )}
                  </span>
                  <span>
                    {authUser && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? `active-link mx-2` : `inactive-link mx-2`
                        }
                        to="/add-items"
                      >
                        Add Items
                      </NavLink>
                    )}
                  </span>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/blogs"
                  >
                    Blogs
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/about-us"
                  >
                    About Us
                  </NavLink>
                </Nav>
                <Nav>
                  {authUser ? (
                    <span>
                      <span className="px-4 user-name">
                        Hello, {authUser.displayName}
                      </span>
                      <button
                        className="btn sign-out-btn"
                        onClick={handleSignOut}
                      >
                        Sign Out
                        <FontAwesomeIcon
                          className="ms-2"
                          icon={faRightFromBracket}
                        />
                      </button>
                    </span>
                  ) : (
                    <NavLink className="mx-2 login-btn" to="/login">
                      Login
                    </NavLink>
                  )}
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
              : pathname.includes("about-us")
              ? "d-none"
              : pathname.includes("manage-inventory")
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
              : pathname.includes("about-us")
              ? `d-none`
              : pathname.includes("manage-inventory")
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
