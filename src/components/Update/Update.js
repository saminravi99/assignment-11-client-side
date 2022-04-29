import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
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

  const [updateStock, setUpdateStock] = useState({
    _id: `${chosenBook?._id}`,
    bookName: `${chosenBook?.bookName}`,
    author: `${chosenBook?.author}`,
    price: `${chosenBook?.price}`,
    quantity: `${chosenBook?.quantity}`,
    description: `${chosenBook?.description}`,
    image: `${chosenBook?.image}`,
  });

  console.log(updateStock);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateStock({
      ...updateStock,
      quantity: e.target.quantity.value,
    });
  }

  // Using FUnction to Return to Previous Page
  const handleGoBack = () => {
    navigate("/inventory");
  };
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
            <div className="card-body">
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
                Available Pieces: {chosenBook?.quantity}
              </h6>
            </div>
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
