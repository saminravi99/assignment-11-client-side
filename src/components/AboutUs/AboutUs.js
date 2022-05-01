import React from "react";
import Leaflet from "../Leaflet/Leaflet";
import "./AboutUs.css";
import team from "../../img/team.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <div className="padding-nav">
      <div>
        <div>
          <div className="d-flex justify-content-center align-items-center about-me-title mt-lg-4">
            <h1>How Do We Work</h1>
          </div>
          <div className="d-flex flex-lg-row flex-column-reverse justify-content-center align-items-center container  about-me-container mt-4">
            <div className="about-me-text-container mx-auto mt-lg-0 my-lg-0 my-5">
              <p>
                Keep track of your books. Our book tracking app was designed
                with you in mind. It's the perfect way for you to maintain a
                digital archive of all your books.Manage your books with one of
                the best and most efficient book management apps available for
                personal libraries. Create an extensive list of titles, and then
                place them into shelves that make sense to your filing system.
                Do you have a set number of shelves in a physical location and
                only need digital organization? Use this app to help keep your
                books in order.
              </p>
              <p>
                With our app, you can easily manage your books. Keep track of
                all the books you have to read and organize them together
                online. You'll be amazed by how efficiently you can add, edit
                and delete books as well as connect with book partners to share
                your experience.Unlike traditional book cataloging systems, our
                Book App helps you manage your entire library of books in one
                place. Create custom collections, track book series and more.All
                of your favorite books can now be stored in one place with our
                Book App. Whether you prefer reading a book on iBooks or Kindle,
                our app will have you covered.
              </p>
            </div>
            <div className=" mx-auto ">
              <img className="about-me-img" src={team} alt="teamwork" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center about-me-title">
          <h1>Contact Address</h1>
        </div>
        <div className="d-flex flex-lg-row flex-column justify-content-around align-items-center mt-4">
          <div className="leaflet-texts">
            <h5>
              <FontAwesomeIcon className="me-2" icon={faLocationDot} /> F10,
              Zakir Hossain Road, Mohammadpur, Dhaka 1207
            </h5>
            <h5 className="my-4">
              <FontAwesomeIcon className="me-3" icon={faEnvelope} />
              Official:
              <a className="ps-3" href="http://dermacare.co.za/">
                https://warehouse-management-saminravi.web.app
              </a>
            </h5>
            <h5 className="mb-lg-0 mb-5">
              <FontAwesomeIcon className="me-2" icon={faPhone} /> Helpline :
              01322810873 , 01322810867 , 01322810869
            </h5>
          </div>
          <Leaflet></Leaflet>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
