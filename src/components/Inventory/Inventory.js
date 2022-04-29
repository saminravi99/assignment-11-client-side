import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../App/App";
import "./Inventory.css";

const Inventory = () => {
  const { books } = useContext(AllContext);

  const navigate = useNavigate();

  const handleAddNewItem = () => {
    navigate("/add-items");
  }

  const handleUpdateStock = (id) => {
    navigate(`/inventory/${id}`);
  }

  const book = books.map((book) => {
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
              <button onClick={() => handleUpdateStock(book._id)} className="btn btn-primary d-block mx-auto px-5 py-2 mt-4">
                Update Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="padding-nav">
      <div className="row container mx-auto">{book}</div>
      <div>
        <button onClick={handleAddNewItem} className="btn btn-primary d-block mx-auto px-5 py-2 my-4">
            Add New Item
        </button>
      </div>
    </div>
  );
};

export default Inventory;
