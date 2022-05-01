import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../App/App";
import "./Home.css";
import second from "../../img/second.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faDownload, faFileCirclePlus, faFilePen, faHeart } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //Context API
  const { books } = useContext(AllContext);

  //Navigate Hook
  const navigate = useNavigate();

  //Slicing to show maximum 6 items in the home page
  const slicedBooks = books.slice(0, 6);

  //Function to navigate to the inventory page
  const handleInventory = () => {
    navigate("/inventory");
  };

  //Function to update the stock of the items of the inventory
  const handleUpdateStock = (id) => {
    navigate(`/inventory/${id}`);
  };

  //Mapping books array to show the items in the home page
  const eachBook = slicedBooks.map((book) => {
    return (
      <div className="col-12 col-lg-4" key={book._id}>
        <div className="card my-3">
          <div className="mx-auto">
            <img className="book-img" src={book.image} alt={book.bookName} />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">{book.bookName}</h5>
            <div className="d-flex justify-content-even align-items-center my-3">
              <h6 className="card-text mb-0 mx-3">Author: {book.author}</h6>
              <p className="card-text book-price ">Price : $ {book.price}</p>
            </div>
            <p className="card-text card-description ">
              <span className="description"> Description:</span>{" "}
              {book.description.slice(0, 100)}...
            </p>
            <h6 className="card-text">Available Pieces: {book.quantity}</h6>
            <div>
              <button
                onClick={() => handleUpdateStock(book._id)}
                className="btn btn-primary d-block mx-auto px-5 py-2 mt-4"
              >
                Update Stock
                <FontAwesomeIcon className="ms-2" icon={faFilePen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="my-lg-5 home-container">
      <h1 className=" text-center text-muted text-capitalize mt-5 ">
        Catalogue
      </h1>
      <div className="row container mx-auto">{eachBook}</div>
      <div>
        <button
          onClick={handleInventory}
          className="btn btn-primary d-block mx-auto px-5 py-2 my-4"
        >
          Manage Inventories
          <FontAwesomeIcon  className="ms-2" icon={faFileCirclePlus} />
        </button>
      </div>

      <div className="d-flex flex-column-reverse flex-lg-row align-items-center second-section">
        <div className="container ms-lg-5  second-section-left">
          <h2 className="second-section-headline my-lg-3 my-3 mb-3 text-center text-lg-start ">
            There are 800+ Books Ready to Manage and Store
          </h2>
          <p className="second-section-paragraph mb-3 text-center text-lg-start">
            Many design choices make it free for you to make a different design
            every time you post. There are 80+ designs with 10+ different
            layouts. Each layout has several designs with the same theme, just
            need to focus on the content!
          </p>

          <h6 className="my-4 bullets">
            <span className="text-primary pe-2">
              <FontAwesomeIcon className="bullet-icons" icon={faCircleDot} />{" "}
              Promotions:
            </span>
            get more potential customers by making product or service promotions
            in a more attractive way.
          </h6>
          <h6 className="my-4 bullets">
            <span className="text-primary pe-2">
              <FontAwesomeIcon className="bullet-icons" icon={faCircleDot} />{" "}
              Insights:
            </span>
            create content that contains insights on design, coding, or
            recommendations for the best tourist attractions.
          </h6>
          <h6 className="my-4 bullets">
            <span className="text-primary pe-2">
              <FontAwesomeIcon className="bullet-icons" icon={faCircleDot} />{" "}
              Much More:
            </span>
            design more types of content with Social Feeds and increase
            followers on your social media accounts.
          </h6>
        </div>
        <div className="second-section-right">
          <img className="img-right" src={second} alt="second" />
        </div>
      </div>

      <div>
        <div className="mt-4 mt-lg-0">
          <h2 className="text-center mb-4 third-section-headline ">
            Download <span className="text-primary">BookFly</span> Today!{" "}
          </h2>
          <p className="text-center third-section-paragraph">
            Optimized For Posts on All Social Media: Facebook, Instagram &
            Twitter.Books In your Warehouse is easily manageable! Give it A try
            to Your Store Today!
          </p>
          <div className="d-flex justify-content-center mt-lg-0 mt-4 ">
            <button className="btn btn-primary d-block mx-4">
              <FontAwesomeIcon className="me-2" icon={faDownload} />
              Download Now
            </button>
            <button className="btn btn-success d-block ">
              <FontAwesomeIcon className="me-2" icon={faHeart} />
              Say Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
