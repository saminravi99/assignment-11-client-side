import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AllContext } from "../App/App";
import auth from "../firebase.init";
import "./Update.css";

const Update = () => {
  //Using React Firebase Hook
  const [authUser] = useAuthState(auth);
  const params = useParams();

  // Using React Router DOM
  const navigate = useNavigate();

  // Using Context API
  const { books } = useContext(AllContext);

  //Using Array Find Method For Dynamic Checkout Route
  const chosenBook = books?.find((book) => book?._id === params?.id);

  console.log(chosenBook);

  const [userBook, setUserBook] = useState([]);

  console.log(userBook);

  useEffect(() => {
    fetch(
      `https://warehouse-management-saminravi.herokuapp.com/user?email=${authUser?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserBook(data);
      });
  }, [authUser?.email]);

  const [updateStock, setUpdateStock] = useState({
    _id: "",
    bookName: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  const [stockUpdateUser, setStockUpdateUser] = useState({});

  console.log(stockUpdateUser);

  console.log(updateStock);

  const handleStockChange = (e) => {
    setUpdateStock({
      bookName: chosenBook?.bookName,
      author: chosenBook?.author,
      price: chosenBook?.price,
      description: chosenBook?.description,
      image: chosenBook?.image,
      [e.target.name]: e.target.value,
    });

    setStockUpdateUser({
      bookName: chosenBook?.bookName,
      author: chosenBook?.author,
      price: chosenBook?.price,
      description: chosenBook?.description,
      image: chosenBook?.image,
      [e.target.name]: e.target.value,
      user: authUser.displayName,
      email: authUser.email,
    });
  };

  const [bookQuantity, setBookQuantity] = useState(0);

  console.log(bookQuantity);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (chosenBook?.quantity) {
      setBookQuantity(e.target.quantity.value);
    }

    axios
      .put(
        `https://warehouse-management-saminravi.herokuapp.com/inventory/${chosenBook._id}`,
        updateStock
      )
      .then((response) => {
        const { data } = response;
        if (data.insertedId) {
          toast.success("Book Updated Successfully");
        }
        axios
          .post(
            `https://warehouse-management-saminravi.herokuapp.com/userStockUpdate`,
            stockUpdateUser
          )
          .then((response) => {
            const { data } = response;
            if (data.insertedId) {
              console.log("User Added Successfully");
            }
          })
          .then(() => {
            const requiredBook = userBook.find(
              (book) => book.bookName === chosenBook.bookName
            );
            axios
              .put(
                `https://warehouse-management-saminravi.herokuapp.com/users/${requiredBook._id}`,
                stockUpdateUser
              )
              .then((response) => {
                const { data } = response;
                if (data.insertedId) {
                  console.log("User Updated Successfully");
                }
              });
          });

        // e.target.reset();
        toast.success("Book Added Successfully");
      });
  };

  const handleDeliver = () => {
    if (chosenBook.quantity > 0) {
      if (bookQuantity > 0) {
        setBookQuantity(bookQuantity - 1);
        chosenBook.quantity = bookQuantity - 1;
      } else {
        chosenBook.quantity = chosenBook.quantity - 1;
      }

      setUpdateStock({
        bookName: chosenBook?.bookName,
        author: chosenBook?.author,
        price: chosenBook?.price,
        description: chosenBook?.description,
        image: chosenBook?.image,
        quantity: chosenBook.quantity,
      });
    }
    //https://warehouse-management-saminravi.herokuapp.com/inventory/${chosenBook._id}
    //(http://localhost:5000/inventory/${chosenBook._id})
    //(http://localhost:5000/users/${requiredBook._id})
    //https://warehouse-management-saminravi.herokuapp.com/users/${requiredBook._id}
    axios
      .put(
        `https://warehouse-management-saminravi.herokuapp.com/inventory/${chosenBook._id}`,
        {
          bookName: chosenBook?.bookName,
          author: chosenBook?.author,
          price: chosenBook?.price,
          description: chosenBook?.description,
          image: chosenBook?.image,
          quantity: chosenBook.quantity,
        }
      )
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.matchedCount) {
          toast.success("Book Delivered Successfully");
        }
      })
      .then(() => {
        const requiredBook = userBook.find(
          (book) => book.bookName === chosenBook.bookName
        );
        axios
          .put(
            `https://warehouse-management-saminravi.herokuapp.com/users/${requiredBook._id}`,
            {
              user: authUser.displayName,
              email: authUser.email,
              bookName: chosenBook?.bookName,
              author: chosenBook?.author,
              price: chosenBook?.price,
              description: chosenBook?.description,
              image: chosenBook?.image,
              quantity: chosenBook.quantity,
            }
          )
          .then((response) => {
            const { data } = response;
            if (data.matchedCount) {
              console.log("User Updated Successfully");
            }
          });
      });
  };

  console.log(chosenBook);

  useEffect(() => {
    console.log(chosenBook?.quantity);
  }, [chosenBook?.quantity]);

  // Using Function to Return to Previous Page
  const handleGoBack = () => {
    navigate("/inventory");
  };

  useEffect(() => {
    console.log(updateStock);
  }, [updateStock, chosenBook?.quantity]);

  return (
    <div>
      <div className="back-btn" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className="d-flex flex-lg-row flex-column justify-content-around align-items-center   container mx-auto">
        <div className="update-stock-info mx-5">
          <div className="card card-container mt-lg-5">
            <div className="mx-auto">
              <img
                className="book-img"
                src={chosenBook?.image}
                alt={chosenBook?.bookName}
              />
            </div>
            <div className="card-body-update">
              <h3 className="card-title text-center">{chosenBook?.bookName}</h3>
              <div className="d-flex justify-content-around align-items-center my-3">
                <h6 className="card-text mb-0 mx-3">
                  Author: {chosenBook?.author}
                </h6>
                <p className="card-text book-price ">
                  Price : $ {chosenBook?.price}
                </p>
              </div>
              <p className="card-text card-description">
                <span className="description"> Description:</span>
                {chosenBook?.description.slice(0, 500)}...
              </p>
              <h6 className="card-text">
                Available Pieces:{" "}
                {bookQuantity ? bookQuantity : chosenBook?.quantity}
              </h6>
            </div>
          </div>
          <div>
            <button
              onClick={handleDeliver}
              className="btn btn-success d-block mx-auto  px-5"
            >
              Deliver
            </button>
          </div>
        </div>
        <div className="update-stock-form mt-lg-0 mt-5">
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-lg-0 mb-5 text-center">
              Please Update The Stock of{" "}
              <span className="text-primary">"{chosenBook?.bookName}"</span>
            </h1>
            <Form.Group
              className="mb-3 mt-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="checkout-labels">Your Name</Form.Label>
              <Form.Control
                disabled={authUser?.displayName ? true : false}
                value={authUser?.displayName}
                type="text"
                placeholder="First Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="checkout-labels">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={authUser?.email}
                required
                disabled={authUser?.email ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="checkout-labels">Selected Book</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Your Selected Book"
                value={chosenBook?.bookName}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="checkout-labels">
                Remaining Stock
              </Form.Label>
              <Form.Control
                onChange={handleStockChange}
                type="number"
                name="quantity"
                placeholder="Number of Stock"
                required
              />
            </Form.Group>

            <Button
              className="px-5 d-block mx-auto checkout-labels"
              variant="primary"
              type="submit"
            >
              Update Stock
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Update;
