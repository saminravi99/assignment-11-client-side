import "./Footer.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPhone,
  faLocationDot,
  faBriefcase,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  //Function to get new date and year for copyright text
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <footer className="footer-bg">
        <div className="container py-5">
          <div className="row py-4">
            <div className="col-lg-4 col-12  mb-4 mb-lg-0">
              <img src="img/logo.png" alt="" width="180" className="mb-3" />
              <p className="font-italic text-muted">
                A library for your books, that lets you keep everything in one
                place, and be able to find it easily.
              </p>
              <ul className="list-inline mt-4">
                <li className="list-inline-item">
                  <a href="." target="_blank" title="twitter">
                    <FontAwesomeIcon
                      className="footer-icons"
                      icon={faMessage}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="." target="_blank" title="facebook">
                    <FontAwesomeIcon className="footer-icons" icon={faPhone} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="." target="_blank" title="instagram">
                    <FontAwesomeIcon
                      className="footer-icons"
                      icon={faLocationDot}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="." target="_blank" title="pinterest">
                    <FontAwesomeIcon
                      className="footer-icons"
                      icon={faBriefcase}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="." target="_blank" title="vimeo">
                    <FontAwesomeIcon className="footer-icons" icon={faAward} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6 mb-4 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">Store</h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Science Fictions
                  </a>
                </li>
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Non Fictions
                  </a>
                </li>
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Story Books
                  </a>
                </li>
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Our Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6 mb-4 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Login
                  </a>
                </li>
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Register
                  </a>
                </li>
                <li className="mb-2">
                  <a href="." className="text-muted">
                    Wishlist
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-lg-0">
              <h6 className="text-uppercase font-weight-bold mb-4">
                Newsletter
              </h6>
              <p className="text-muted mb-4">
                Books is a beautifully designed app. It makes reading a book as
                easy and delightful as it should be.
              </p>
              <div className="p-1 rounded border">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    aria-describedby="button-addon1"
                    className="form-control border-0 shadow-0"
                  />
                  <div className="input-group-append">
                    <button
                      id="button-addon1"
                      type="submit"
                      className="btn btn-link"
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="container text-center">
            <p className="text-muted mb-0 py-2">
              &copy; Book Fly {year}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
