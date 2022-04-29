import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import "./AddItems.css";

const AddItems = () => {
  const [authUser] = useAuthState(auth);
  const [addBook, setAddBook] = useState({
    bookName: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  const [userInfo, setUserInfo] = useState({
    user: authUser.displayName,
    email: authUser.email,
    bookName: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });
  console.log(addBook);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddBook({
      ...addBook,
      bookName: e.target.bookName.value,
      author: e.target.author.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      description: e.target.description.value,
      image: e.target.image.value,
    });

    setUserInfo({
      ...userInfo,
      bookName: e.target.bookName.value,
      author: e.target.author.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      description: e.target.description.value,
      image: e.target.image.value,
    });

    e.target.reset();
  };


  return (
    <div className="padding-nav">
      <div className="add-book-form">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-lg-0 mb-5 text-center">
            Please Add New Book To Your Store
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
            <Form.Label className="checkout-labels">Book Cover Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL of the Book"
              required
              name="image"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Of Your Book"
              required
              name="bookName"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Name of Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Book Author Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Description</Form.Label>

            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description Of Your Book"
              required
              name="description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Number of Stock"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Number Of Stock</Form.Label>
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
            Add This Item To The Store
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItems;
