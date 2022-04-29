import React from 'react';
import "./HeroSection.css";
import heroImg from "../../img/heroImg.png";

const HeroSection = () => {
    return (
      <div className="container d-flex flex-lg-row flex-column-reverse justify-content-center align-items-center ">
        <div>
          <h1 className="hero-header">
            Lets You Manage Your
            <span className="text-primary">Book Store Simply</span> Like Never
            Before
          </h1>
          <p className="hero-details mt-4">
            Books is a free, cloud based accounting package that works on all
            your devices. Books provides you with a full accounting toolset to
            manage your receipts and expenses as well as stock and bank accounts
            in one simple package!
          </p>
        </div>
        <div className="mt-4 ">
          <img className="hero-image" src={heroImg} alt="heroimg" />
        </div>
      </div>
    );
};

export default HeroSection;