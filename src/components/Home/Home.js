import React, { useContext } from "react";
import { AllContext } from "../App/App";
import "./Home.css";

const Home = () => {
  const { books } = useContext(AllContext);

  const slicedBooks = books.slice(0, 6);

  const eachBook = slicedBooks.map((book) => {
    return (
      <div className="col-4" key={book._id}>
        <div className="card my-3">
          <div className="mx-auto">
            <img className="book-img" src={book.image} alt={book.bookName} />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">{book.bookName}</h5>
            <div className="d-flex justify-content-center align-items-center my-3">
              <h6 className="card-text mb-0 mx-3">Author: {book.author}</h6>
              <p className="card-text ">Price : $ {book.price}</p>
            </div>
            <p className="card-text card-description ">
              <span className="description"> Description:</span> {book.description.slice(0, 100)}...
            </p>
            <h6 className="card-text">Available Pieces: {book.quantity}</h6>
            <div>
              <button className="btn btn-primary d-block mx-auto px-5 py-2 mt-4">
                Update Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="my-5">
      <h1 className=" text-center text-muted text-capitalize ">Catalogue</h1>
      <div className="row container mx-auto">{eachBook}</div>
      <div>
        <button className="btn btn-primary d-block mx-auto px-5 py-2 my-4">
          Manage All Books
        </button>
      </div>
    </div>
  );
};

export default Home;
