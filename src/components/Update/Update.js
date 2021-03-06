import { faArrowLeft, faTruck, faFilePen, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import {  useNavigate, useParams } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
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

  //Declaring React States
  const [userBook, setUserBook] = useState([]);

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

  const [bookQuantity, setBookQuantity] = useState(0);

  //useEffect Hook to fetch the only books added by a user
  useEffect(() => {
    fetch(
      `https://warehouse-management-saminravi.herokuapp.com/user?email=${authUser?.email}`,
      {
        headers: {
          email: `${authUser?.email}`,
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserBook(data);
      });
  }, [authUser?.email]);

  // Click Handler Function for Updating Book Stock
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

  //Click Handler Function for Submitting New Book and User Info To The Server API
  const handleSubmit = (e) => {
    e.preventDefault();

    if (chosenBook?.quantity) {
      setBookQuantity(e.target.quantity.value);
    }

    axiosPrivate
      .put(
        `https://warehouse-management-saminravi.herokuapp.com/inventory/${chosenBook._id}`,
        updateStock,
        {
          headers: {
            email: authUser.email,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.insertedId) {
          toast.success("Stock Updated Successfully");
        }
        axiosPrivate
          .post(
            `https://warehouse-management-saminravi.herokuapp.com/userStockUpdate`,
            stockUpdateUser,
            {
              headers: {
                email: authUser.email,
              },
            }
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
            axiosPrivate
              .put(
                `https://warehouse-management-saminravi.herokuapp.com/users/${requiredBook._id}`,
                stockUpdateUser,
                {
                  headers: {
                    email: authUser.email,
                  },
                }
              )
              .then((response) => {
                const { data } = response;
                if (data.insertedId) {
                  console.log("User Updated Successfully");
                }
              });
          });

        e.target.reset();
        toast.success("Stock Updated Successfully");
      });
  };
  console.log(bookQuantity);

  //Click Handler Function to Deliver a book
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
    }else{
      toast.error("Stock Not Available");
    }
    axiosPrivate
      .put(
        `https://warehouse-management-saminravi.herokuapp.com/inventory/${chosenBook._id}`,
        {
          bookName: chosenBook?.bookName,
          author: chosenBook?.author,
          price: chosenBook?.price,
          description: chosenBook?.description,
          image: chosenBook?.image,
          quantity: chosenBook.quantity,
        },
        {
          headers: {
            email: authUser.email,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.matchedCount) {
          if(chosenBook.quantity >= 1){
            toast.success("Book Delivered Successfully");
          }else{
            toast.error("Stock Not Available");
          }
        }
      })
      .then(() => {
        const requiredBook = userBook.find(
          (book) => book.bookName === chosenBook.bookName
        );
        axiosPrivate
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
            },
            {
              headers: {
                email: authUser.email,
              },
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
  //useEffect Hook to reload the page after stock quantity updated during delivery of the book
  useEffect(() => {
    console.log(chosenBook?.quantity);
  }, [chosenBook?.quantity]);

  // Using Function to Return to Previous Page
  

  const handleGoBack = () => {
    navigate(-1);
  };

  //useEffect Hook to reload Page after the stock is updated
  useEffect(() => {
    console.log(updateStock);
  }, [updateStock, chosenBook?.quantity]);

  const handleManageInventory = () => {
    navigate("/manage-inventory");
  }

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
                Available Pieces:
                {bookQuantity ? bookQuantity : chosenBook?.quantity}
              </h6>
            </div>
          </div>
          <div>
            <button
              onClick={handleDeliver}
              className="btn btn-success d-block mx-auto  px-5"
            >
              Deliver This Book
              <FontAwesomeIcon className="ms-2" icon={faTruck} />
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
              <FontAwesomeIcon className="ms-2" icon={faFilePen} />
            </Button>
          </Form>
        </div>
      </div>

      <div className="my-5">
        <button
          onClick={handleManageInventory}
          className="btn btn-secondary d-block mx-auto px-5"
        >
          Manage Inventory
          <FontAwesomeIcon className="ms-2" icon={faFileCirclePlus} />
        </button>
      </div>
    </div>
  );
};

export default Update;
