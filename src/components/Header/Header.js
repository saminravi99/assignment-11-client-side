import "./Header.css";
import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../img/logoBookImg.PNG";

const Header = () => {
    return (
      <div>
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
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/inventory"
                >
                  Inventory
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/my-items"
                >
                  My Items
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/add-items"
                >
                  Add Items
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/blogs"
                >
                  Blogs
                </NavLink>
              </Nav>
              <Nav>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active-link mx-4` : `inactive-link mx-4`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
};

export default Header;