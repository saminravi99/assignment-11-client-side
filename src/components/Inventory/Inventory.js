import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useBooks from "../hooks/useBooks";
import "./Inventory.css";

const Inventory = () => {
  const [books, setBooks] = useBooks();

  const [user] = useAuthState(auth);
  const email = user?.email;

  const [userAddedBooks, setUserAddedBooks] = useState([]);

  console.log(userAddedBooks);
  const url = `https://warehouse-management-saminravi.herokuapp.com/user?email=${email}`;

  useEffect(() => {
    fetch(url,{
      headers:{
        "Content-Type":"application/json",
        "email":`${user?.email}`,
        "authorization":`Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserAddedBooks(data);
      });
  }, [url, user]);

  const navigate = useNavigate();

  const handleAddNewItem = () => {
    navigate("/add-items");
  };

  const handleUpdateStock = (id) => {
    navigate(`/inventory/${id}`);
  };

  const handleDeleteBook = (id, bookName) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://warehouse-management-saminravi.herokuapp.com/books/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "email": `${user?.email}`,
          "authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = books.filter((book) => book._id !== id);
          console.log(remaining);
          setBooks(remaining);
        })
        .then(() => {
          const userAddedBook = userAddedBooks.find(
            (book) => book.bookName === bookName
          );

          const userUrl = `https://warehouse-management-saminravi.herokuapp.com/users/${userAddedBook?._id}`;

          fetch(userUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "email": `${user?.email}`,
              "authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
             
            });
        }
          
        )

      
    }
  };

  const book = books.map((book) => {
    return (
      <div className="col-12 col-lg-4 my-3" key={book._id}>
        <div className="card my-3  inventory-card">
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
            <div className="">
              <button
                onClick={() => handleUpdateStock(book._id)}
                className="btn btn-primary d-block mx-auto px-5 py-2 mt-4"
              >
                Update Stock
              </button>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => handleDeleteBook(book._id, book.bookName)}
                  className="btn btn-danger d-block px-5  py-2 my-4"
                >
                  Delete
                </button>
              </div>
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
        <button
          onClick={handleAddNewItem}
          className="btn btn-primary d-block mx-auto px-5 py-2 my-4"
        >
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default Inventory;
