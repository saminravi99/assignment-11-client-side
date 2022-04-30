import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../App/App";
import "./Home.css";
import second from "../../img/second.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { books } = useContext(AllContext);

  const navigate = useNavigate();

  const slicedBooks = books.slice(0, 6);

  const handleInventory = () => {
    navigate("/inventory");
  };

  const handleUpdateStock = (id) => {
    navigate(`/inventory/${id}`);
  };

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
          Manage All Books
        </button>
      </div>

      <div className="d-flex flex-column-reverse flex-lg-row align-items-center second-section">
        <div className="container ms-lg-5  second-section-left">
          <h2 className="second-section-headline my-lg-3 mb-3 text-center text-lg-start ">
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
    </div>
  );
};

export default Home;
